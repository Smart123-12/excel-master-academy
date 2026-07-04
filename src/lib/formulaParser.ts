// ==================== Formula Parsing & Evaluation Engine ====================
// This is the CORE engine powering the Excel simulator.

// ==================== Types ====================
export interface CellRef {
  col: number;
  row: number;
}

export type FormulaValue = string | number | boolean | null;
export type FormulaResult = FormulaValue | FormulaError;

export class FormulaError {
  constructor(public type: string, public message?: string) {}
  toString(): string {
    return this.type;
  }
}

// Standard Excel errors
export const ERRORS = {
  VALUE: new FormulaError('#VALUE!', 'Invalid value'),
  REF: new FormulaError('#REF!', 'Invalid cell reference'),
  NAME: new FormulaError('#NAME?', 'Unrecognized formula name'),
  DIV0: new FormulaError('#DIV/0!', 'Division by zero'),
  NA: new FormulaError('#N/A', 'Value not available'),
  NULL: new FormulaError('#NULL!', 'Null reference'),
  NUM: new FormulaError('#NUM!', 'Invalid number'),
} as const;

// ==================== Utility Helpers ====================

/** Convert column letter(s) to 0-based index: 'A' -> 0, 'Z' -> 25, 'AA' -> 26 */
export function columnToIndex(col: string): number {
  let index = 0;
  const upper = col.toUpperCase();
  for (let i = 0; i < upper.length; i++) {
    index = index * 26 + (upper.charCodeAt(i) - 64);
  }
  return index - 1;
}

/** Convert 0-based index to column letter(s): 0 -> 'A', 25 -> 'Z', 26 -> 'AA' */
export function indexToColumn(index: number): string {
  let result = '';
  let n = index + 1;
  while (n > 0) {
    n--;
    result = String.fromCharCode(65 + (n % 26)) + result;
    n = Math.floor(n / 26);
  }
  return result;
}

/** Parse a cell reference string like 'A1', '$A$1', 'AB123' into {col, row} (0-based) */
export function parseCellRef(ref: string): CellRef | null {
  const clean = ref.replace(/\$/g, '');
  const match = clean.match(/^([A-Za-z]+)(\d+)$/);
  if (!match) return null;
  return {
    col: columnToIndex(match[1]),
    row: parseInt(match[2], 10) - 1,
  };
}

/** Convert {col, row} back to a cell reference string like 'A1' */
export function cellRefToString(ref: CellRef): string {
  return `${indexToColumn(ref.col)}${ref.row + 1}`;
}

/** Expand a range like 'A1:B3' into an array of cell reference strings */
export function expandRange(rangeStr: string): string[] {
  const parts = rangeStr.split(':');
  if (parts.length !== 2) return [];

  const start = parseCellRef(parts[0].trim());
  const end = parseCellRef(parts[1].trim());
  if (!start || !end) return [];

  const cells: string[] = [];
  const minCol = Math.min(start.col, end.col);
  const maxCol = Math.max(start.col, end.col);
  const minRow = Math.min(start.row, end.row);
  const maxRow = Math.max(start.row, end.row);

  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      cells.push(cellRefToString({ col, row }));
    }
  }
  return cells;
}

// ==================== Tokenizer ====================

type TokenType =
  | 'NUMBER'
  | 'STRING'
  | 'BOOLEAN'
  | 'CELL_REF'
  | 'RANGE'
  | 'FUNCTION'
  | 'OPERATOR'
  | 'COMPARATOR'
  | 'LPAREN'
  | 'RPAREN'
  | 'COMMA'
  | 'CONCAT'
  | 'COLON';

interface Token {
  type: TokenType;
  value: string;
}

function tokenize(formula: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < formula.length) {
    const ch = formula[i];

    // Skip whitespace
    if (ch === ' ' || ch === '\t') {
      i++;
      continue;
    }

    // String literal
    if (ch === '"') {
      let str = '';
      i++;
      while (i < formula.length && formula[i] !== '"') {
        str += formula[i];
        i++;
      }
      i++; // skip closing quote
      tokens.push({ type: 'STRING', value: str });
      continue;
    }

    // Comparators (must check multi-char before single-char)
    if (ch === '<' && i + 1 < formula.length && formula[i + 1] === '>') {
      tokens.push({ type: 'COMPARATOR', value: '<>' });
      i += 2;
      continue;
    }
    if (ch === '<' && i + 1 < formula.length && formula[i + 1] === '=') {
      tokens.push({ type: 'COMPARATOR', value: '<=' });
      i += 2;
      continue;
    }
    if (ch === '>' && i + 1 < formula.length && formula[i + 1] === '=') {
      tokens.push({ type: 'COMPARATOR', value: '>=' });
      i += 2;
      continue;
    }
    if (ch === '<') {
      tokens.push({ type: 'COMPARATOR', value: '<' });
      i++;
      continue;
    }
    if (ch === '>') {
      tokens.push({ type: 'COMPARATOR', value: '>' });
      i++;
      continue;
    }
    if (ch === '=') {
      tokens.push({ type: 'COMPARATOR', value: '=' });
      i++;
      continue;
    }

    // Operators
    if (ch === '+' || ch === '-') {
      // Check for unary minus/plus (at start, after operator, after lparen, after comma, after comparator)
      const prevToken = tokens.length > 0 ? tokens[tokens.length - 1] : null;
      const isUnary =
        !prevToken ||
        prevToken.type === 'OPERATOR' ||
        prevToken.type === 'COMPARATOR' ||
        prevToken.type === 'LPAREN' ||
        prevToken.type === 'COMMA' ||
        prevToken.type === 'CONCAT';

      if (isUnary && (ch === '-' || ch === '+')) {
        // Look ahead: parse the number if next is digit or dot
        if (i + 1 < formula.length && (/\d/.test(formula[i + 1]) || formula[i + 1] === '.')) {
          let numStr = ch;
          i++;
          while (i < formula.length && (/\d/.test(formula[i]) || formula[i] === '.')) {
            numStr += formula[i];
            i++;
          }
          // Check for scientific notation
          if (i < formula.length && (formula[i] === 'e' || formula[i] === 'E')) {
            numStr += formula[i];
            i++;
            if (i < formula.length && (formula[i] === '+' || formula[i] === '-')) {
              numStr += formula[i];
              i++;
            }
            while (i < formula.length && /\d/.test(formula[i])) {
              numStr += formula[i];
              i++;
            }
          }
          tokens.push({ type: 'NUMBER', value: numStr });
          continue;
        }
      }

      tokens.push({ type: 'OPERATOR', value: ch });
      i++;
      continue;
    }

    if (ch === '*' || ch === '/' || ch === '^') {
      tokens.push({ type: 'OPERATOR', value: ch });
      i++;
      continue;
    }

    // Concatenation operator
    if (ch === '&') {
      tokens.push({ type: 'CONCAT', value: '&' });
      i++;
      continue;
    }

    // Parentheses
    if (ch === '(') {
      tokens.push({ type: 'LPAREN', value: '(' });
      i++;
      continue;
    }
    if (ch === ')') {
      tokens.push({ type: 'RPAREN', value: ')' });
      i++;
      continue;
    }

    // Comma
    if (ch === ',') {
      tokens.push({ type: 'COMMA', value: ',' });
      i++;
      continue;
    }

    // Colon (for ranges)
    if (ch === ':') {
      tokens.push({ type: 'COLON', value: ':' });
      i++;
      continue;
    }

    // Number
    if (/\d/.test(ch) || (ch === '.' && i + 1 < formula.length && /\d/.test(formula[i + 1]))) {
      let numStr = '';
      while (i < formula.length && (/\d/.test(formula[i]) || formula[i] === '.')) {
        numStr += formula[i];
        i++;
      }
      if (i < formula.length && (formula[i] === 'e' || formula[i] === 'E')) {
        numStr += formula[i];
        i++;
        if (i < formula.length && (formula[i] === '+' || formula[i] === '-')) {
          numStr += formula[i];
          i++;
        }
        while (i < formula.length && /\d/.test(formula[i])) {
          numStr += formula[i];
          i++;
        }
      }
      // Check if next chars make this a cell ref like "1" part of a token — no, numbers come first
      tokens.push({ type: 'NUMBER', value: numStr });
      continue;
    }

    // Identifiers: cell refs, function names, booleans
    if (/[A-Za-z$_]/.test(ch)) {
      let ident = '';
      while (i < formula.length && /[A-Za-z0-9$_]/.test(formula[i])) {
        ident += formula[i];
        i++;
      }

      const upper = ident.toUpperCase();

      // Boolean
      if (upper === 'TRUE' || upper === 'FALSE') {
        tokens.push({ type: 'BOOLEAN', value: upper });
        continue;
      }

      // Function name if followed by '('
      if (i < formula.length && formula[i] === '(') {
        tokens.push({ type: 'FUNCTION', value: upper });
        continue;
      }

      // Cell reference check
      const cleanIdent = ident.replace(/\$/g, '');
      if (/^[A-Za-z]{1,3}\d+$/.test(cleanIdent)) {
        tokens.push({ type: 'CELL_REF', value: ident.toUpperCase().replace(/\$/g, '') });
        continue;
      }

      // Treat as a potential function or name error
      tokens.push({ type: 'FUNCTION', value: upper });
      continue;
    }

    // Skip unrecognized characters
    i++;
  }

  // Post-process: merge CELL_REF COLON CELL_REF into RANGE
  const merged: Token[] = [];
  for (let j = 0; j < tokens.length; j++) {
    if (
      tokens[j].type === 'CELL_REF' &&
      j + 2 < tokens.length &&
      tokens[j + 1].type === 'COLON' &&
      tokens[j + 2].type === 'CELL_REF'
    ) {
      merged.push({ type: 'RANGE', value: `${tokens[j].value}:${tokens[j + 2].value}` });
      j += 2;
    } else {
      merged.push(tokens[j]);
    }
  }

  return merged;
}

// ==================== AST Nodes ====================

type ASTNode =
  | { type: 'number'; value: number }
  | { type: 'string'; value: string }
  | { type: 'boolean'; value: boolean }
  | { type: 'cell_ref'; ref: string }
  | { type: 'range'; range: string }
  | { type: 'binary_op'; op: string; left: ASTNode; right: ASTNode }
  | { type: 'unary_op'; op: string; operand: ASTNode }
  | { type: 'function_call'; name: string; args: ASTNode[] }
  | { type: 'concat'; left: ASTNode; right: ASTNode }
  | { type: 'comparison'; op: string; left: ASTNode; right: ASTNode };

// ==================== Parser ====================

class Parser {
  private tokens: Token[];
  private pos: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.pos = 0;
  }

  private peek(): Token | null {
    return this.pos < this.tokens.length ? this.tokens[this.pos] : null;
  }

  private consume(): Token {
    return this.tokens[this.pos++];
  }

  private expect(type: TokenType): Token {
    const tok = this.consume();
    if (!tok || tok.type !== type) {
      throw new FormulaError('#VALUE!', `Expected ${type}`);
    }
    return tok;
  }

  parse(): ASTNode {
    const node = this.parseComparison();
    if (this.pos < this.tokens.length) {
      // There might be leftover tokens — that's okay for some formulas
    }
    return node;
  }

  private parseComparison(): ASTNode {
    let left = this.parseConcatenation();

    while (this.peek()?.type === 'COMPARATOR') {
      const op = this.consume().value;
      const right = this.parseConcatenation();
      left = { type: 'comparison', op, left, right };
    }

    return left;
  }

  private parseConcatenation(): ASTNode {
    let left = this.parseAddSub();

    while (this.peek()?.type === 'CONCAT') {
      this.consume();
      const right = this.parseAddSub();
      left = { type: 'concat', left, right };
    }

    return left;
  }

  private parseAddSub(): ASTNode {
    let left = this.parseMulDiv();

    while (this.peek()?.type === 'OPERATOR' && (this.peek()!.value === '+' || this.peek()!.value === '-')) {
      const op = this.consume().value;
      const right = this.parseMulDiv();
      left = { type: 'binary_op', op, left, right };
    }

    return left;
  }

  private parseMulDiv(): ASTNode {
    let left = this.parsePower();

    while (this.peek()?.type === 'OPERATOR' && (this.peek()!.value === '*' || this.peek()!.value === '/')) {
      const op = this.consume().value;
      const right = this.parsePower();
      left = { type: 'binary_op', op, left, right };
    }

    return left;
  }

  private parsePower(): ASTNode {
    let left = this.parseUnary();

    while (this.peek()?.type === 'OPERATOR' && this.peek()!.value === '^') {
      this.consume();
      const right = this.parseUnary();
      left = { type: 'binary_op', op: '^', left, right };
    }

    return left;
  }

  private parseUnary(): ASTNode {
    if (this.peek()?.type === 'OPERATOR' && (this.peek()!.value === '-' || this.peek()!.value === '+')) {
      const op = this.consume().value;
      const operand = this.parseUnary();
      if (op === '+') return operand;
      return { type: 'unary_op', op: '-', operand };
    }
    return this.parsePrimary();
  }

  private parsePrimary(): ASTNode {
    const tok = this.peek();

    if (!tok) {
      throw new FormulaError('#VALUE!', 'Unexpected end of formula');
    }

    // Number
    if (tok.type === 'NUMBER') {
      this.consume();
      return { type: 'number', value: parseFloat(tok.value) };
    }

    // String
    if (tok.type === 'STRING') {
      this.consume();
      return { type: 'string', value: tok.value };
    }

    // Boolean
    if (tok.type === 'BOOLEAN') {
      this.consume();
      return { type: 'boolean', value: tok.value === 'TRUE' };
    }

    // Range
    if (tok.type === 'RANGE') {
      this.consume();
      return { type: 'range', range: tok.value };
    }

    // Cell reference
    if (tok.type === 'CELL_REF') {
      this.consume();
      return { type: 'cell_ref', ref: tok.value };
    }

    // Function call
    if (tok.type === 'FUNCTION') {
      const name = this.consume().value;
      this.expect('LPAREN');
      const args: ASTNode[] = [];

      if (this.peek()?.type !== 'RPAREN') {
        args.push(this.parseComparison());
        while (this.peek()?.type === 'COMMA') {
          this.consume();
          args.push(this.parseComparison());
        }
      }

      this.expect('RPAREN');
      return { type: 'function_call', name, args };
    }

    // Parenthesized expression
    if (tok.type === 'LPAREN') {
      this.consume();
      const node = this.parseComparison();
      this.expect('RPAREN');
      return node;
    }

    throw new FormulaError('#VALUE!', `Unexpected token: ${tok.value}`);
  }
}

// ==================== Formula Engine ====================

type CellValueGetter = (ref: string) => string | number | null;

export class FormulaEngine {
  private getCellValue: CellValueGetter;
  private evaluationStack: Set<string>; // circular reference detection

  constructor(getCellValue: CellValueGetter) {
    this.getCellValue = getCellValue;
    this.evaluationStack = new Set();
  }

  /** Evaluate a formula string. If it starts with '=', parse and compute. */
  evaluate(formula: string): string | number | FormulaError {
    if (!formula || typeof formula !== 'string') return '';

    const trimmed = formula.trim();
    if (!trimmed.startsWith('=')) {
      // Not a formula; return raw value, coerce number if possible
      const num = Number(trimmed);
      if (trimmed !== '' && !isNaN(num)) return num;
      return trimmed;
    }

    // Strip the leading '='
    const expr = trimmed.substring(1).trim();
    if (!expr) return '';

    try {
      const tokens = tokenize(expr);
      const parser = new Parser(tokens);
      const ast = parser.parse();
      const result = this.evalNode(ast);

      if (result instanceof FormulaError) return result;
      if (result === null || result === undefined) return '';
      if (typeof result === 'boolean') return result ? 'TRUE' : 'FALSE';
      return result;
    } catch (err) {
      if (err instanceof FormulaError) return err;
      return new FormulaError('#VALUE!', String(err));
    }
  }

  // ==================== AST Evaluator ====================

  private evalNode(node: ASTNode): FormulaValue | FormulaError {
    switch (node.type) {
      case 'number':
        return node.value;
      case 'string':
        return node.value;
      case 'boolean':
        return node.value;
      case 'cell_ref':
        return this.resolveCellValue(node.ref);
      case 'range':
        // A range used as a value resolves to an error (ranges should be consumed by functions)
        return new FormulaError('#VALUE!', 'Range used as value');
      case 'binary_op':
        return this.evalBinaryOp(node.op, node.left, node.right);
      case 'unary_op':
        return this.evalUnaryOp(node.op, node.operand);
      case 'comparison':
        return this.evalComparison(node.op, node.left, node.right);
      case 'concat':
        return this.evalConcat(node.left, node.right);
      case 'function_call':
        return this.evalFunction(node.name, node.args);
      default:
        return new FormulaError('#VALUE!');
    }
  }

  private resolveCellValue(ref: string): FormulaValue | FormulaError {
    // Circular reference check
    if (this.evaluationStack.has(ref)) {
      return new FormulaError('#REF!', 'Circular reference detected');
    }

    this.evaluationStack.add(ref);
    try {
      const raw = this.getCellValue(ref);
      if (raw === null || raw === undefined) return null;
      if (typeof raw === 'number') return raw;
      // If the retrieved value is a formula, evaluate it
      const str = String(raw);
      if (str.startsWith('=')) {
        return this.evaluate(str) as FormulaValue | FormulaError;
      }
      const num = Number(str);
      if (str !== '' && !isNaN(num)) return num;
      return str;
    } finally {
      this.evaluationStack.delete(ref);
    }
  }

  /** Resolve a node to an array of values (for functions accepting ranges) */
  private resolveToArray(node: ASTNode): (FormulaValue | FormulaError)[] {
    if (node.type === 'range') {
      const cells = expandRange(node.range);
      return cells.map((ref) => this.resolveCellValue(ref));
    }
    if (node.type === 'cell_ref') {
      return [this.resolveCellValue(node.ref)];
    }
    const val = this.evalNode(node);
    return [val];
  }

  /** Resolve range values as numbers, skipping non-numeric */
  private resolveNumbers(node: ASTNode): number[] {
    const values = this.resolveToArray(node);
    const nums: number[] = [];
    for (const v of values) {
      if (v instanceof FormulaError) continue;
      if (typeof v === 'number') {
        nums.push(v);
      } else if (typeof v === 'boolean') {
        nums.push(v ? 1 : 0);
      } else if (typeof v === 'string' && v !== '') {
        const n = Number(v);
        if (!isNaN(n)) nums.push(n);
      }
    }
    return nums;
  }

  private toNumber(val: FormulaValue | FormulaError): number | FormulaError {
    if (val instanceof FormulaError) return val;
    if (typeof val === 'number') return val;
    if (typeof val === 'boolean') return val ? 1 : 0;
    if (val === null || val === '') return 0;
    const n = Number(val);
    if (isNaN(n)) return new FormulaError('#VALUE!', `Cannot convert "${val}" to number`);
    return n;
  }

  private toString(val: FormulaValue | FormulaError): string {
    if (val instanceof FormulaError) return val.type;
    if (val === null || val === undefined) return '';
    return String(val);
  }

  // ==================== Operators ====================

  private evalBinaryOp(op: string, leftNode: ASTNode, rightNode: ASTNode): FormulaValue | FormulaError {
    const leftVal = this.evalNode(leftNode);
    const rightVal = this.evalNode(rightNode);

    const left = this.toNumber(leftVal);
    const right = this.toNumber(rightVal);

    if (left instanceof FormulaError) return left;
    if (right instanceof FormulaError) return right;

    switch (op) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        if (right === 0) return new FormulaError('#DIV/0!');
        return left / right;
      case '^':
        return Math.pow(left, right);
      default:
        return new FormulaError('#VALUE!', `Unknown operator: ${op}`);
    }
  }

  private evalUnaryOp(op: string, operandNode: ASTNode): FormulaValue | FormulaError {
    const val = this.evalNode(operandNode);
    const num = this.toNumber(val);
    if (num instanceof FormulaError) return num;
    if (op === '-') return -num;
    return num;
  }

  private evalComparison(op: string, leftNode: ASTNode, rightNode: ASTNode): FormulaValue | FormulaError {
    const left = this.evalNode(leftNode);
    const right = this.evalNode(rightNode);

    if (left instanceof FormulaError) return left;
    if (right instanceof FormulaError) return right;

    // Compare numbers if both are numeric
    const lNum = typeof left === 'number' ? left : null;
    const rNum = typeof right === 'number' ? right : null;

    if (lNum !== null && rNum !== null) {
      switch (op) {
        case '=': return lNum === rNum;
        case '<>': return lNum !== rNum;
        case '<': return lNum < rNum;
        case '>': return lNum > rNum;
        case '<=': return lNum <= rNum;
        case '>=': return lNum >= rNum;
      }
    }

    // String comparison (case-insensitive, Excel style)
    const lStr = this.toString(left).toUpperCase();
    const rStr = this.toString(right).toUpperCase();

    switch (op) {
      case '=': return lStr === rStr;
      case '<>': return lStr !== rStr;
      case '<': return lStr < rStr;
      case '>': return lStr > rStr;
      case '<=': return lStr <= rStr;
      case '>=': return lStr >= rStr;
    }

    return new FormulaError('#VALUE!');
  }

  private evalConcat(leftNode: ASTNode, rightNode: ASTNode): FormulaValue | FormulaError {
    const left = this.evalNode(leftNode);
    const right = this.evalNode(rightNode);
    if (left instanceof FormulaError) return left;
    if (right instanceof FormulaError) return right;
    return this.toString(left) + this.toString(right);
  }

  // ==================== Function Evaluator ====================

  private evalFunction(name: string, args: ASTNode[]): FormulaValue | FormulaError {
    switch (name) {
      // ---------- Math / Stats ----------
      case 'SUM':
        return this.fnSum(args);
      case 'AVERAGE':
        return this.fnAverage(args);
      case 'COUNT':
        return this.fnCount(args);
      case 'COUNTA':
        return this.fnCountA(args);
      case 'MIN':
        return this.fnMin(args);
      case 'MAX':
        return this.fnMax(args);
      case 'ABS':
        return this.fnAbs(args);
      case 'ROUND':
        return this.fnRound(args);

      // ---------- Logical ----------
      case 'IF':
        return this.fnIf(args);
      case 'IFS':
        return this.fnIfs(args);
      case 'AND':
        return this.fnAnd(args);
      case 'OR':
        return this.fnOr(args);
      case 'NOT':
        return this.fnNot(args);
      case 'IFERROR':
        return this.fnIfError(args);
      case 'IFNA':
        return this.fnIfNa(args);

      // ---------- Conditional Aggregation ----------
      case 'COUNTIF':
        return this.fnCountIf(args);
      case 'COUNTIFS':
        return this.fnCountIfs(args);
      case 'SUMIF':
        return this.fnSumIf(args);
      case 'SUMIFS':
        return this.fnSumIfs(args);
      case 'AVERAGEIF':
        return this.fnAverageIf(args);
      case 'AVERAGEIFS':
        return this.fnAverageIfs(args);

      // ---------- Lookup ----------
      case 'VLOOKUP':
        return this.fnVLookup(args);
      case 'HLOOKUP':
        return this.fnHLookup(args);
      case 'INDEX':
        return this.fnIndex(args);
      case 'MATCH':
        return this.fnMatch(args);
      case 'XLOOKUP':
        return this.fnXLookup(args);

      // ---------- Text ----------
      case 'CONCATENATE':
        return this.fnConcatenate(args);
      case 'CONCAT':
        return this.fnConcat(args);
      case 'TEXTJOIN':
        return this.fnTextJoin(args);
      case 'LEFT':
        return this.fnLeft(args);
      case 'RIGHT':
        return this.fnRight(args);
      case 'MID':
        return this.fnMid(args);
      case 'LEN':
        return this.fnLen(args);
      case 'TRIM':
        return this.fnTrim(args);
      case 'UPPER':
        return this.fnUpper(args);
      case 'LOWER':
        return this.fnLower(args);

      // ---------- Date ----------
      case 'TODAY':
        return this.fnToday();
      case 'NOW':
        return this.fnNow();

      // ---------- Dynamic Arrays ----------
      case 'FILTER':
        return this.fnFilter(args);
      case 'UNIQUE':
        return this.fnUnique(args);
      case 'SORT':
        return this.fnSort(args);
      case 'SORTBY':
        return this.fnSortBy(args);
      case 'SEQUENCE':
        return this.fnSequence(args);
      case 'LET':
        return this.fnLet(args);

      default:
        return new FormulaError('#NAME?', `Unknown function: ${name}`);
    }
  }

  // ==================== Math / Stats Functions ====================

  private fnSum(args: ASTNode[]): FormulaValue | FormulaError {
    let total = 0;
    for (const arg of args) {
      const nums = this.resolveNumbers(arg);
      for (const n of nums) total += n;
    }
    return total;
  }

  private fnAverage(args: ASTNode[]): FormulaValue | FormulaError {
    const allNums: number[] = [];
    for (const arg of args) {
      allNums.push(...this.resolveNumbers(arg));
    }
    if (allNums.length === 0) return new FormulaError('#DIV/0!');
    return allNums.reduce((a, b) => a + b, 0) / allNums.length;
  }

  private fnCount(args: ASTNode[]): FormulaValue | FormulaError {
    let count = 0;
    for (const arg of args) {
      const vals = this.resolveToArray(arg);
      for (const v of vals) {
        if (v instanceof FormulaError) continue;
        if (typeof v === 'number') count++;
        else if (typeof v === 'string' && v !== '' && !isNaN(Number(v))) count++;
      }
    }
    return count;
  }

  private fnCountA(args: ASTNode[]): FormulaValue | FormulaError {
    let count = 0;
    for (const arg of args) {
      const vals = this.resolveToArray(arg);
      for (const v of vals) {
        if (v instanceof FormulaError) { count++; continue; }
        if (v !== null && v !== '' && v !== undefined) count++;
      }
    }
    return count;
  }

  private fnMin(args: ASTNode[]): FormulaValue | FormulaError {
    const allNums: number[] = [];
    for (const arg of args) {
      allNums.push(...this.resolveNumbers(arg));
    }
    if (allNums.length === 0) return 0;
    return Math.min(...allNums);
  }

  private fnMax(args: ASTNode[]): FormulaValue | FormulaError {
    const allNums: number[] = [];
    for (const arg of args) {
      allNums.push(...this.resolveNumbers(arg));
    }
    if (allNums.length === 0) return 0;
    return Math.max(...allNums);
  }

  private fnAbs(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 1) return new FormulaError('#VALUE!');
    const val = this.evalNode(args[0]);
    const num = this.toNumber(val);
    if (num instanceof FormulaError) return num;
    return Math.abs(num);
  }

  private fnRound(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 1) return new FormulaError('#VALUE!');
    const val = this.evalNode(args[0]);
    const num = this.toNumber(val);
    if (num instanceof FormulaError) return num;

    let digits = 0;
    if (args.length >= 2) {
      const d = this.evalNode(args[1]);
      const dNum = this.toNumber(d);
      if (dNum instanceof FormulaError) return dNum;
      digits = Math.round(dNum);
    }

    const factor = Math.pow(10, digits);
    return Math.round(num * factor) / factor;
  }

  // ==================== Logical Functions ====================

  private fnIf(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 2) return new FormulaError('#VALUE!', 'IF requires at least 2 arguments');
    const condition = this.evalNode(args[0]);
    if (condition instanceof FormulaError) return condition;

    const isTruthy = this.isTruthy(condition);
    if (isTruthy) {
      return this.evalNode(args[1]);
    }
    if (args.length >= 3) {
      return this.evalNode(args[2]);
    }
    return false;
  }

  private fnAnd(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length === 0) return new FormulaError('#VALUE!');
    for (const arg of args) {
      const val = this.evalNode(arg);
      if (val instanceof FormulaError) return val;
      if (!this.isTruthy(val)) return false;
    }
    return true;
  }

  private fnOr(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length === 0) return new FormulaError('#VALUE!');
    for (const arg of args) {
      const val = this.evalNode(arg);
      if (val instanceof FormulaError) return val;
      if (this.isTruthy(val)) return true;
    }
    return false;
  }

  private fnNot(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 1) return new FormulaError('#VALUE!');
    const val = this.evalNode(args[0]);
    if (val instanceof FormulaError) return val;
    return !this.isTruthy(val);
  }

  private fnIfError(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 2) return new FormulaError('#VALUE!');
    const val = this.evalNode(args[0]);
    if (val instanceof FormulaError) {
      return this.evalNode(args[1]);
    }
    return val;
  }

  private isTruthy(val: FormulaValue | FormulaError): boolean {
    if (val instanceof FormulaError) return false;
    if (val === null || val === undefined || val === '') return false;
    if (typeof val === 'boolean') return val;
    if (typeof val === 'number') return val !== 0;
    if (typeof val === 'string') {
      if (val.toUpperCase() === 'TRUE') return true;
      if (val.toUpperCase() === 'FALSE') return false;
      return val !== '';
    }
    return true;
  }

  // ==================== Conditional Aggregation ====================

  private matchesCriteria(value: FormulaValue | FormulaError, criteria: string): boolean {
    if (value instanceof FormulaError) return false;

    const criteriaStr = criteria.trim();

    // Operator-based criteria: ">5", "<=10", "<>abc"
    const opMatch = criteriaStr.match(/^(<>|>=|<=|>|<|=)(.*)$/);
    if (opMatch) {
      const op = opMatch[1];
      const compareVal = opMatch[2];
      const numVal = typeof value === 'number' ? value : Number(value);
      const numCompare = Number(compareVal);

      if (!isNaN(numVal) && !isNaN(numCompare)) {
        switch (op) {
          case '>': return numVal > numCompare;
          case '<': return numVal < numCompare;
          case '>=': return numVal >= numCompare;
          case '<=': return numVal <= numCompare;
          case '=': return numVal === numCompare;
          case '<>': return numVal !== numCompare;
        }
      }

      // String comparison
      const sVal = this.toString(value).toUpperCase();
      const sComp = compareVal.toUpperCase();
      switch (op) {
        case '=': return sVal === sComp;
        case '<>': return sVal !== sComp;
        default: return false;
      }
    }

    // Wildcard matching: * and ?
    if (criteriaStr.includes('*') || criteriaStr.includes('?')) {
      const regex = new RegExp(
        '^' + criteriaStr.replace(/\*/g, '.*').replace(/\?/g, '.') + '$',
        'i'
      );
      return regex.test(this.toString(value));
    }

    // Direct comparison
    const numCriteria = Number(criteriaStr);
    if (!isNaN(numCriteria) && criteriaStr !== '') {
      const numValue = typeof value === 'number' ? value : Number(value);
      if (!isNaN(numValue)) return numValue === numCriteria;
    }

    return this.toString(value).toUpperCase() === criteriaStr.toUpperCase();
  }

  private fnCountIf(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 2) return new FormulaError('#VALUE!');
    const rangeVals = this.resolveToArray(args[0]);
    const criteria = this.toString(this.evalNode(args[1]));

    let count = 0;
    for (const v of rangeVals) {
      if (this.matchesCriteria(v, criteria)) count++;
    }
    return count;
  }

  private fnSumIf(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 2) return new FormulaError('#VALUE!');

    const rangeVals = this.resolveToArray(args[0]);
    const criteria = this.toString(this.evalNode(args[1]));

    // Sum range (optional; defaults to the criteria range)
    const sumVals = args.length >= 3 ? this.resolveToArray(args[2]) : rangeVals;

    let total = 0;
    for (let i = 0; i < rangeVals.length; i++) {
      if (this.matchesCriteria(rangeVals[i], criteria)) {
        const sv = i < sumVals.length ? sumVals[i] : null;
        const num = this.toNumber(sv);
        if (typeof num === 'number') total += num;
      }
    }
    return total;
  }

  // ==================== Lookup Functions ====================

  private getRangeValues2D(node: ASTNode): { values: (FormulaValue | FormulaError)[][]; rows: number; cols: number } | FormulaError {
    if (node.type !== 'range') return new FormulaError('#VALUE!', 'Expected range');
    const parts = node.range.split(':');
    const start = parseCellRef(parts[0]);
    const end = parseCellRef(parts[1]);
    if (!start || !end) return new FormulaError('#REF!');

    const minRow = Math.min(start.row, end.row);
    const maxRow = Math.max(start.row, end.row);
    const minCol = Math.min(start.col, end.col);
    const maxCol = Math.max(start.col, end.col);

    const rows = maxRow - minRow + 1;
    const cols = maxCol - minCol + 1;
    const values: (FormulaValue | FormulaError)[][] = [];

    for (let r = minRow; r <= maxRow; r++) {
      const row: (FormulaValue | FormulaError)[] = [];
      for (let c = minCol; c <= maxCol; c++) {
        row.push(this.resolveCellValue(cellRefToString({ col: c, row: r })));
      }
      values.push(row);
    }

    return { values, rows, cols };
  }

  private fnVLookup(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 3) return new FormulaError('#VALUE!');

    const lookupVal = this.evalNode(args[0]);
    if (lookupVal instanceof FormulaError) return lookupVal;

    const tableData = this.getRangeValues2D(args[1]);
    if (tableData instanceof FormulaError) return tableData;

    const colIndexVal = this.evalNode(args[2]);
    const colIndex = this.toNumber(colIndexVal);
    if (colIndex instanceof FormulaError) return colIndex;

    if (colIndex < 1 || colIndex > tableData.cols) return new FormulaError('#REF!');

    // Approximate match by default
    let exactMatch = false;
    if (args.length >= 4) {
      const matchType = this.evalNode(args[3]);
      if (matchType instanceof FormulaError) return matchType;
      exactMatch = !this.isTruthy(matchType); // FALSE = exact match
    }

    // Search first column
    for (let r = 0; r < tableData.rows; r++) {
      const cellVal = tableData.values[r][0];
      if (cellVal instanceof FormulaError) continue;

      if (exactMatch) {
        if (this.valuesEqual(cellVal, lookupVal)) {
          return tableData.values[r][Math.round(colIndex) - 1];
        }
      } else {
        // Approximate: find largest value <= lookup value
        if (this.valuesEqual(cellVal, lookupVal)) {
          return tableData.values[r][Math.round(colIndex) - 1];
        }
      }
    }

    return new FormulaError('#N/A', 'VLOOKUP: value not found');
  }

  private fnHLookup(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 3) return new FormulaError('#VALUE!');

    const lookupVal = this.evalNode(args[0]);
    if (lookupVal instanceof FormulaError) return lookupVal;

    const tableData = this.getRangeValues2D(args[1]);
    if (tableData instanceof FormulaError) return tableData;

    const rowIndexVal = this.evalNode(args[2]);
    const rowIndex = this.toNumber(rowIndexVal);
    if (rowIndex instanceof FormulaError) return rowIndex;

    if (rowIndex < 1 || rowIndex > tableData.rows) return new FormulaError('#REF!');

    let exactMatch = false;
    if (args.length >= 4) {
      const matchType = this.evalNode(args[3]);
      if (matchType instanceof FormulaError) return matchType;
      exactMatch = !this.isTruthy(matchType);
    }

    // Search first row
    for (let c = 0; c < tableData.cols; c++) {
      const cellVal = tableData.values[0][c];
      if (cellVal instanceof FormulaError) continue;

      if (exactMatch || this.valuesEqual(cellVal, lookupVal)) {
        if (this.valuesEqual(cellVal, lookupVal)) {
          return tableData.values[Math.round(rowIndex) - 1][c];
        }
      }
    }

    return new FormulaError('#N/A', 'HLOOKUP: value not found');
  }

  private fnIndex(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 2) return new FormulaError('#VALUE!');

    const tableData = this.getRangeValues2D(args[0]);
    if (tableData instanceof FormulaError) return tableData;

    const rowNumVal = this.evalNode(args[1]);
    const rowNum = this.toNumber(rowNumVal);
    if (rowNum instanceof FormulaError) return rowNum;

    let colNum = 1;
    if (args.length >= 3) {
      const c = this.evalNode(args[2]);
      const cn = this.toNumber(c);
      if (cn instanceof FormulaError) return cn;
      colNum = cn;
    }

    const r = Math.round(rowNum) - 1;
    const c = Math.round(colNum) - 1;

    if (r < 0 || r >= tableData.rows || c < 0 || c >= tableData.cols) {
      return new FormulaError('#REF!');
    }

    return tableData.values[r][c];
  }

  private fnMatch(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 2) return new FormulaError('#VALUE!');

    const lookupVal = this.evalNode(args[0]);
    if (lookupVal instanceof FormulaError) return lookupVal;

    const rangeVals = this.resolveToArray(args[1]);

    let matchType = 1; // 1 = less than, 0 = exact, -1 = greater than
    if (args.length >= 3) {
      const mt = this.evalNode(args[2]);
      const mtNum = this.toNumber(mt);
      if (typeof mtNum === 'number') matchType = mtNum;
    }

    if (matchType === 0) {
      // Exact match
      for (let i = 0; i < rangeVals.length; i++) {
        if (this.valuesEqual(rangeVals[i], lookupVal)) return i + 1;
      }
      return new FormulaError('#N/A');
    }

    if (matchType === 1) {
      // Largest value <= lookup (assumes sorted ascending)
      let lastMatch = -1;
      for (let i = 0; i < rangeVals.length; i++) {
        const v = rangeVals[i];
        if (v instanceof FormulaError) continue;
        const cmp = this.compareValues(v, lookupVal);
        if (cmp <= 0) lastMatch = i;
        else break;
      }
      if (lastMatch === -1) return new FormulaError('#N/A');
      return lastMatch + 1;
    }

    if (matchType === -1) {
      // Smallest value >= lookup (assumes sorted descending)
      let lastMatch = -1;
      for (let i = 0; i < rangeVals.length; i++) {
        const v = rangeVals[i];
        if (v instanceof FormulaError) continue;
        const cmp = this.compareValues(v, lookupVal);
        if (cmp >= 0) lastMatch = i;
        else break;
      }
      if (lastMatch === -1) return new FormulaError('#N/A');
      return lastMatch + 1;
    }

    return new FormulaError('#VALUE!');
  }

  private fnXLookup(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 3) return new FormulaError('#VALUE!');

    const lookupVal = this.evalNode(args[0]);
    if (lookupVal instanceof FormulaError) return lookupVal;

    const lookupArray = this.resolveToArray(args[1]);
    const returnArray = this.resolveToArray(args[2]);

    // Optional if_not_found (default #N/A)
    const ifNotFound = args.length >= 4 ? this.evalNode(args[3]) : new FormulaError('#N/A');

    for (let i = 0; i < lookupArray.length; i++) {
      if (this.valuesEqual(lookupArray[i], lookupVal)) {
        return i < returnArray.length ? returnArray[i] : new FormulaError('#N/A');
      }
    }

    return ifNotFound;
  }

  // ==================== Text Functions ====================

  private fnConcatenate(args: ASTNode[]): FormulaValue | FormulaError {
    let result = '';
    for (const arg of args) {
      const val = this.evalNode(arg);
      if (val instanceof FormulaError) return val;
      result += this.toString(val);
    }
    return result;
  }

  private fnLeft(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 1) return new FormulaError('#VALUE!');
    const text = this.toString(this.evalNode(args[0]));
    let numChars = 1;
    if (args.length >= 2) {
      const n = this.toNumber(this.evalNode(args[1]));
      if (n instanceof FormulaError) return n;
      numChars = Math.max(0, Math.round(n));
    }
    return text.substring(0, numChars);
  }

  private fnRight(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 1) return new FormulaError('#VALUE!');
    const text = this.toString(this.evalNode(args[0]));
    let numChars = 1;
    if (args.length >= 2) {
      const n = this.toNumber(this.evalNode(args[1]));
      if (n instanceof FormulaError) return n;
      numChars = Math.max(0, Math.round(n));
    }
    return text.substring(Math.max(0, text.length - numChars));
  }

  private fnMid(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 3) return new FormulaError('#VALUE!');
    const text = this.toString(this.evalNode(args[0]));
    const startNum = this.toNumber(this.evalNode(args[1]));
    const numChars = this.toNumber(this.evalNode(args[2]));
    if (startNum instanceof FormulaError) return startNum;
    if (numChars instanceof FormulaError) return numChars;
    if (startNum < 1) return new FormulaError('#VALUE!');
    return text.substring(Math.round(startNum) - 1, Math.round(startNum) - 1 + Math.max(0, Math.round(numChars)));
  }

  private fnLen(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 1) return new FormulaError('#VALUE!');
    const text = this.toString(this.evalNode(args[0]));
    return text.length;
  }

  private fnTrim(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 1) return new FormulaError('#VALUE!');
    const text = this.toString(this.evalNode(args[0]));
    return text.replace(/\s+/g, ' ').trim();
  }

  private fnUpper(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 1) return new FormulaError('#VALUE!');
    return this.toString(this.evalNode(args[0])).toUpperCase();
  }

  private fnLower(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 1) return new FormulaError('#VALUE!');
    return this.toString(this.evalNode(args[0])).toLowerCase();
  }

  // ==================== Date Functions ====================

  private fnToday(): FormulaValue {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  private fnNow(): FormulaValue {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
  }

  // ==================== Dynamic Array Functions ====================

  private fnFilter(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 2) return new FormulaError('#VALUE!');

    const arrayVals = this.resolveToArray(args[0]);
    const includeVals = this.resolveToArray(args[1]);

    const result: (FormulaValue | FormulaError)[] = [];
    for (let i = 0; i < arrayVals.length; i++) {
      const include = i < includeVals.length ? includeVals[i] : false;
      if (this.isTruthy(include instanceof FormulaError ? null : include)) {
        result.push(arrayVals[i]);
      }
    }

    if (result.length === 0) {
      if (args.length >= 3) return this.evalNode(args[2]);
      return new FormulaError('#N/A', 'FILTER: no results');
    }

    // Return first value for single-cell context
    return result[0] instanceof FormulaError ? result[0] : result[0];
  }

  private fnUnique(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 1) return new FormulaError('#VALUE!');
    const vals = this.resolveToArray(args[0]);
    const seen = new Set<string>();
    const unique: (FormulaValue | FormulaError)[] = [];

    for (const v of vals) {
      const key = v instanceof FormulaError ? v.type : String(v);
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(v);
      }
    }

    if (unique.length === 0) return new FormulaError('#N/A');
    return unique[0] instanceof FormulaError ? unique[0] : unique[0];
  }

  private fnSort(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 1) return new FormulaError('#VALUE!');

    const vals = this.resolveToArray(args[0]);
    let ascending = true;
    if (args.length >= 3) {
      const order = this.evalNode(args[2]);
      const orderNum = this.toNumber(order);
      if (typeof orderNum === 'number') ascending = orderNum !== -1;
    }

    const sorted = [...vals].sort((a, b) => {
      if (a instanceof FormulaError || b instanceof FormulaError) return 0;
      const cmp = this.compareValues(a, b);
      return ascending ? cmp : -cmp;
    });

    if (sorted.length === 0) return new FormulaError('#N/A');
    return sorted[0] instanceof FormulaError ? sorted[0] : sorted[0];
  }

  private fnLet(args: ASTNode[]): FormulaValue | FormulaError {
    // LET(name1, value1, name2, value2, ..., expression)
    // Simplified: just evaluate the last argument
    if (args.length < 3 || args.length % 2 === 0) {
      return new FormulaError('#VALUE!', 'LET requires name-value pairs and a final expression');
    }

    // We can't truly bind variables in our AST, so evaluate the last expression
    // For a more complete impl, we'd need a variable scope
    return this.evalNode(args[args.length - 1]);
  }

  private fnCountIfs(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 2 || args.length % 2 !== 0) {
      return new FormulaError('#VALUE!', 'COUNTIFS requires pairs of range/criteria');
    }

    const ranges: (FormulaValue | FormulaError)[][] = [];
    const criterias: string[] = [];

    for (let i = 0; i < args.length; i += 2) {
      ranges.push(this.resolveToArray(args[i]));
      criterias.push(this.toString(this.evalNode(args[i + 1])));
    }

    const length = ranges[0].length;
    for (const r of ranges) {
      if (r.length !== length) return new FormulaError('#VALUE!', 'Ranges must be of equal size');
    }

    let count = 0;
    for (let i = 0; i < length; i++) {
      let matches = true;
      for (let j = 0; j < ranges.length; j++) {
        if (!this.matchesCriteria(ranges[j][i], criterias[j])) {
          matches = false;
          break;
        }
      }
      if (matches) count++;
    }
    return count;
  }

  private fnSumIfs(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 3 || args.length % 2 === 0) {
      return new FormulaError('#VALUE!', 'SUMIFS requires a sum range and pairs of range/criteria');
    }

    const sumVals = this.resolveToArray(args[0]);
    const ranges: (FormulaValue | FormulaError)[][] = [];
    const criterias: string[] = [];

    for (let i = 1; i < args.length; i += 2) {
      ranges.push(this.resolveToArray(args[i]));
      criterias.push(this.toString(this.evalNode(args[i + 1])));
    }

    const length = sumVals.length;
    for (const r of ranges) {
      if (r.length !== length) return new FormulaError('#VALUE!', 'Ranges must be equal size to sum range');
    }

    let total = 0;
    for (let i = 0; i < length; i++) {
      let matches = true;
      for (let j = 0; j < ranges.length; j++) {
        if (!this.matchesCriteria(ranges[j][i], criterias[j])) {
          matches = false;
          break;
        }
      }
      if (matches) {
        const num = this.toNumber(sumVals[i]);
        if (typeof num === 'number') total += num;
      }
    }
    return total;
  }

  private fnAverageIf(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 2) return new FormulaError('#VALUE!');
    const rangeVals = this.resolveToArray(args[0]);
    const criteria = this.toString(this.evalNode(args[1]));
    const avgVals = args.length >= 3 ? this.resolveToArray(args[2]) : rangeVals;

    let sum = 0;
    let count = 0;
    for (let i = 0; i < rangeVals.length; i++) {
      if (this.matchesCriteria(rangeVals[i], criteria)) {
        const val = this.toNumber(avgVals[i]);
        if (typeof val === 'number') {
          sum += val;
          count++;
        }
      }
    }
    if (count === 0) return new FormulaError('#DIV/0!');
    return sum / count;
  }

  private fnAverageIfs(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 3 || args.length % 2 === 0) {
      return new FormulaError('#VALUE!', 'AVERAGEIFS requires an average range and pairs of range/criteria');
    }

    const avgVals = this.resolveToArray(args[0]);
    const ranges: (FormulaValue | FormulaError)[][] = [];
    const criterias: string[] = [];

    for (let i = 1; i < args.length; i += 2) {
      ranges.push(this.resolveToArray(args[i]));
      criterias.push(this.toString(this.evalNode(args[i + 1])));
    }

    const length = avgVals.length;
    for (const r of ranges) {
      if (r.length !== length) return new FormulaError('#VALUE!', 'Ranges must be equal size to average range');
    }

    let sum = 0;
    let count = 0;
    for (let i = 0; i < length; i++) {
      let matches = true;
      for (let j = 0; j < ranges.length; j++) {
        if (!this.matchesCriteria(ranges[j][i], criterias[j])) {
          matches = false;
          break;
        }
      }
      if (matches) {
        const num = this.toNumber(avgVals[i]);
        if (typeof num === 'number') {
          sum += num;
          count++;
        }
      }
    }
    if (count === 0) return new FormulaError('#DIV/0!');
    return sum / count;
  }

  private fnIfs(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 2 || args.length % 2 !== 0) {
      return new FormulaError('#VALUE!', 'IFS requires pairs of test and value');
    }

    for (let i = 0; i < args.length; i += 2) {
      const test = this.evalNode(args[i]);
      if (test instanceof FormulaError) return test;
      if (this.isTruthy(test)) {
        return this.evalNode(args[i + 1]);
      }
    }
    return new FormulaError('#N/A', 'IFS: No true test found');
  }

  private fnIfNa(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 2) return new FormulaError('#VALUE!');
    const val = this.evalNode(args[0]);
    if (val instanceof FormulaError && val.type === '#N/A') {
      return this.evalNode(args[1]);
    }
    return val;
  }

  private fnConcat(args: ASTNode[]): FormulaValue | FormulaError {
    let result = '';
    for (const arg of args) {
      const vals = this.resolveToArray(arg);
      for (const v of vals) {
        if (v instanceof FormulaError) return v;
        result += this.toString(v);
      }
    }
    return result;
  }

  private fnTextJoin(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 3) return new FormulaError('#VALUE!');
    const delimiter = this.toString(this.evalNode(args[0]));
    const ignoreEmpty = this.isTruthy(this.evalNode(args[1]));

    const parts: string[] = [];
    for (let i = 2; i < args.length; i++) {
      const vals = this.resolveToArray(args[i]);
      for (const v of vals) {
        if (v instanceof FormulaError) return v;
        const str = this.toString(v);
        if (ignoreEmpty && str === '') continue;
        parts.push(str);
      }
    }
    return parts.join(delimiter);
  }

  private fnSequence(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 1) return new FormulaError('#VALUE!');
    
    const rowsVal = this.toNumber(this.evalNode(args[0]));
    if (rowsVal instanceof FormulaError) return rowsVal;
    const rows = Math.max(1, Math.round(rowsVal));

    let cols = 1;
    if (args.length >= 2) {
      const cVal = this.toNumber(this.evalNode(args[1]));
      if (cVal instanceof FormulaError) return cVal;
      cols = Math.max(1, Math.round(cVal));
    }

    let start = 1;
    if (args.length >= 3) {
      const sVal = this.toNumber(this.evalNode(args[2]));
      if (sVal instanceof FormulaError) return sVal;
      start = sVal;
    }

    let step = 1;
    if (args.length >= 4) {
      const stVal = this.toNumber(this.evalNode(args[3]));
      if (stVal instanceof FormulaError) return stVal;
      step = stVal;
    }

    return start;
  }

  private fnSortBy(args: ASTNode[]): FormulaValue | FormulaError {
    if (args.length < 2) return new FormulaError('#VALUE!');
    const array = this.resolveToArray(args[0]);
    if (array.length === 0) return null;
    return array[0];
  }

  // ==================== Comparison Helpers ====================

  private valuesEqual(a: FormulaValue | FormulaError, b: FormulaValue | FormulaError): boolean {
    if (a instanceof FormulaError || b instanceof FormulaError) return false;
    if (a === null && b === null) return true;
    if (a === null || b === null) return false;

    // Both numbers
    if (typeof a === 'number' && typeof b === 'number') return a === b;

    // Number vs string coercion
    if (typeof a === 'number' && typeof b === 'string') {
      const bNum = Number(b);
      if (!isNaN(bNum)) return a === bNum;
    }
    if (typeof b === 'number' && typeof a === 'string') {
      const aNum = Number(a);
      if (!isNaN(aNum)) return b === aNum;
    }

    // String comparison (case-insensitive)
    return String(a).toUpperCase() === String(b).toUpperCase();
  }

  private compareValues(a: FormulaValue | FormulaError, b: FormulaValue | FormulaError): number {
    if (a instanceof FormulaError || b instanceof FormulaError) return 0;

    const aNum = typeof a === 'number' ? a : (a !== null && a !== '' ? Number(a) : NaN);
    const bNum = typeof b === 'number' ? b : (b !== null && b !== '' ? Number(b) : NaN);

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum - bNum;
    }

    const aStr = a === null ? '' : String(a).toUpperCase();
    const bStr = b === null ? '' : String(b).toUpperCase();
    return aStr.localeCompare(bStr);
  }
}

export default FormulaEngine;

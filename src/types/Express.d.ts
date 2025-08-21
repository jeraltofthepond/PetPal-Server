//declare -offers type information w/o code, namespace- type extension for thing
declare namespace Express {
  export interface Request {
    userId?: string;
  }
}

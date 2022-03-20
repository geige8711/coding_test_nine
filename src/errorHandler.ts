class HttpError extends Error {
  code:number
  constructor(message:string, errorCode:number) {
    super(message); //Adds a message property
    this.code = errorCode; //Adds a "code" property
  }
}

export default HttpError;
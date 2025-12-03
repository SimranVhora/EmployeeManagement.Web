import { HttpContext, HttpHeaders } from '@angular/common/http';
import { ApiMethod } from "../../enums/api-method"
export interface APIResponse{
  statusCode:number,
  isSuccess:boolean,
  errorMessages?:any,
  result?:any
}

export interface APIRequest{
  apiMethod:ApiMethod,
  url: string,
  requestBody?: object,
  header?: HttpHeaders,
  params?: any,
  context?: HttpContext
}



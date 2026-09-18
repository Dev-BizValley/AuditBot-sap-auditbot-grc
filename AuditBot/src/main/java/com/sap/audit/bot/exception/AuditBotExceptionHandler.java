package com.sap.audit.bot.exception;

import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AuditBotExceptionHandler {
	
	@ExceptionHandler(value=AuditBotAuthenticationException.class)
	    public final ResponseEntity<Object> handleAuthExceptions(AuditBotAuthenticationException ex) {
		 return new ResponseEntity(ex.getMessage(), HttpStatus.UNAUTHORIZED);
	    }
	 
	@ExceptionHandler(value=DataNotFoundException.class)
	  public final ResponseEntity<Object> handelDataNotFoundException(DataNotFoundException ex){
		 return new ResponseEntity(ex.getMessage(), HttpStatus.NOT_FOUND);
		 
	 }

	@ExceptionHandler(value=RuntimeException.class)
	    public final ResponseEntity<Object> handleServerExceptions(AuditBotAuthenticationException ex) {
		 return new ResponseEntity(ex.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
	    }
	 


	 
}

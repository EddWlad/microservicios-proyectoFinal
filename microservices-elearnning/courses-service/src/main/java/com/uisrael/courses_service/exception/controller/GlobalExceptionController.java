package com.uisrael.courses_service.exception.controller;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.uisrael.courses_service.exception.ResourcesNotFoundException;
import com.uisrael.courses_service.response.ApiResponse;

import org.springframework.http.*;

@RestControllerAdvice()
public class GlobalExceptionController {
	
	@ExceptionHandler(ResourcesNotFoundException.class)
	public ResponseEntity<ApiResponse> handlerResourcesNotFoundException(ResourcesNotFoundException resourcesNotFoundException ){
		String mensaje = resourcesNotFoundException.getMessage();
		
		ApiResponse response = new ApiResponse().builder()
				.message(mensaje)
				.success(true)
				.status(HttpStatus.NOT_FOUND)
				.build();
		
		return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
	}
				
}
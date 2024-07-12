package com.uisrael.grades_service.exception;

public class ResourcesNotFoundException extends RuntimeException{
	public ResourcesNotFoundException() {
		super("Recurso no encontrado en el servidor!!!");
	}
	
	public ResourcesNotFoundException(String message) {
		super(message);
	}
}

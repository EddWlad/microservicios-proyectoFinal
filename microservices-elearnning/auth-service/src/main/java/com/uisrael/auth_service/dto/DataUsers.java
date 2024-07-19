package com.uisrael.auth_service.dto;

import lombok.Data;

@Data
public class DataUsers {
    private boolean success;
    private AuthUser data;
    private Object error;
}

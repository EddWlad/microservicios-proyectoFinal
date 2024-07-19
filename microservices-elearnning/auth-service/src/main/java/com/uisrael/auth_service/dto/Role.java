package com.uisrael.auth_service.dto;

import lombok.Data;

@Data
public class Role {
    private String rol_code;
    private String rol_name;
    private String rol_description;
    private boolean rol_status;
}

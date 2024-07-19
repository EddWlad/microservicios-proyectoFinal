package com.uisrael.auth_service.dto;

import lombok.Data;

@Data
public class AuthUser {
    private String use_code;
    private String use_name;
    private String use_lastname;
    private String use_nui;
    private String use_email;
    private boolean use_emailValidated;
    private String use_password;
    private String use_phone;
    private String use_address;
    private String use_img;
    private int use_status;
    private Role use_role;
}
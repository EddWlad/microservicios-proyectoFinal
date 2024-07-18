package com.uisrael.auth_service.dto;

public class AuthUser {
    private String useCode;
    private String userName; 
    private String usePassword; 
    private String useRole; 

    // Getters y Setters

    public String getUseCode() {
        return useCode;
    }

    public void setUseCode(String useCode) {
        this.useCode = useCode;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUsePassword() {
        return usePassword;
    }

    public void setUsePassword(String usePassword) {
        this.usePassword = usePassword;
    }

    public String getUseRole() {
        return useRole;
    }

    public void setUseRole(String useRole) {
        this.useRole = useRole;
    }
}

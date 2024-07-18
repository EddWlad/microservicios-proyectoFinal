package com.uisrael.auth_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.uisrael.auth_service.dto.AuthUser;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@Service
public class ExternalAuthService {

    @Autowired
    private RestTemplate restTemplate;

    public AuthUser fetchUser(String username) {
        String url = "http://localhost:8090/api/auth/login";
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            String jsonRequest = String.format("{\"username\":\"%s\"}", username);
            HttpEntity<String> request = new HttpEntity<>(jsonRequest, headers);

            ResponseEntity<AuthUser> response = restTemplate.postForEntity(url, request, AuthUser.class);
            System.out.println("Usuario autenticado: " + response.toString());
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return response.getBody();
            }
        } catch (RestClientException e) {
            System.err.println("Error al realizar la solicitud: " + e.getMessage());
        }
        return null;
    }
}

package com.uisrael.auth_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.uisrael.auth_service.dto.AuthUser;
import com.uisrael.auth_service.dto.AuthUserDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@Service
public class ExternalAuthService {

    @Autowired
    private RestTemplate restTemplate;

    public AuthUser fetchUser(String dto) {
        String url = "http://localhost:8090/api/user";
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> request = new HttpEntity<>(dto, headers);

            ResponseEntity<AuthUser> response = restTemplate.postForEntity(url, request, AuthUser.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return response.getBody();
            }
        } catch (RestClientException e) {
            System.err.println("Error al realizar la solicitud: " + e.getMessage());
        }
        return null;
    }
}

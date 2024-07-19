package com.uisrael.auth_service.security;

import java.security.Key;
import java.security.SecureRandom;
import java.util.*;

import org.springframework.stereotype.Component;

import com.uisrael.auth_service.dto.AuthUser;
import com.uisrael.auth_service.dto.RequestDto;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtProvider {
    private Key secret;

    @PostConstruct
    protected void init() {
        byte[] apiKeySecretBytes = new byte[64]; // 512 bits
        new SecureRandom().nextBytes(apiKeySecretBytes);
        secret = Keys.hmacShaKeyFor(apiKeySecretBytes);
    }

    public String createToken(AuthUser authUser) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", authUser.getUse_code());
        claims.put("role", authUser.getUse_role());

        Date now = new Date();
        Date exp = new Date(now.getTime() + 3600000);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(authUser.getUse_email())
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(secret)
                .compact();
    }

    public boolean validate(String token, RequestDto requestDto) {
        try {
            Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getEncoded())).build().parseSignedClaims(token);
        } catch (Exception exception) {
            return false;
        }
        return true;
    }

    public String getUserNameFromToken(String token) {
        try {
            return Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getEncoded()))
                    .build()
                    .parseSignedClaims(token).getPayload().getSubject();
        } catch (Exception exception) {
            return "Bad token";
        }
    }
    private boolean isAdmin(String token){
        return Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getEncoded()))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("role").equals("admin");
    }
}

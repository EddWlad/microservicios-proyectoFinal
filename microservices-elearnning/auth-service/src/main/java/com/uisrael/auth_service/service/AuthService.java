package com.uisrael.auth_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.uisrael.auth_service.dto.AuthUser;
import com.uisrael.auth_service.dto.AuthUserDto;
import com.uisrael.auth_service.dto.RequestDto;
import com.uisrael.auth_service.dto.TokenDto;
import com.uisrael.auth_service.security.JwtProvider;

@Service
public class AuthService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private ExternalAuthService externalAuthService;

    public TokenDto login(AuthUserDto dto) {
        AuthUser user = externalAuthService.fetchUser(dto.getUserName());
        if (user == null) {
            return null;
        }
        if (passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            return new TokenDto(jwtProvider.createToken(user));
        }
        return null;
    }
    public TokenDto validate(String token, RequestDto requestDto){
        if(!jwtProvider.validate(token,requestDto)){
            return null;
        }
        String userName = jwtProvider.getUserNameFromToken(token);
        if(externalAuthService.fetchUser(userName) != null){
            return null;
        }
        return new TokenDto(token);
    }

}

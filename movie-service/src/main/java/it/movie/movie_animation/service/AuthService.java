package it.movie.movie_animation.service;

import it.movie.movie_animation.entity.Users;
import it.movie.movie_animation.payload.ApiResponse;
import it.movie.movie_animation.payload.SignUpDto;
import it.movie.movie_animation.repository.AuthRepository;
import it.movie.movie_animation.repository.RoleRepository;
import it.movie.movie_animation.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;

@Service
public class AuthService implements UserDetailsService {
    @Autowired
    AuthRepository repository;

    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Override
    public UserDetails loadUserByUsername(String email) {
        var user = repository.findByEmail(email);
        return user;
    }

    public ApiResponse signUp(SignUpDto signUpDto) {
        boolean exist = repository.existsUsersByEmail(signUpDto.email());
        if (!exist) {
            Users user = Users.builder()
                    .name(signUpDto.name())
                    .surname(signUpDto.surname())
                    .email(signUpDto.email())
                    .password(passwordEncoder.encode(signUpDto.password()))
                    .roles(Collections.singleton(roleRepository.findById(2)
                            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Role not found"))))
                    .enabled(true)
                    .accountNonExpired(true)
                    .accountNonLocked(true)
                    .credentialsNonExpired(true)
                    .build();

            Users savedUser = repository.save(user);

            // JWT tokenni yaratish
            String accessToken = jwtTokenProvider.generateAccessToken(savedUser);

            // ApiResponse ga id ni qo'shish
            return new ApiResponse(accessToken, true, savedUser.getId());
        }
        return new ApiResponse("Bu email allaqachon mavjud", false, null);
    }

}



package it.movie.movie_animation.controller;

import it.movie.movie_animation.entity.Users;
import it.movie.movie_animation.payload.*;
import it.movie.movie_animation.repository.AuthRepository;
import it.movie.movie_animation.security.JwtTokenProvider;
import it.movie.movie_animation.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AuthService service;
    @Autowired
    private JwtTokenProvider tokenService;
    @Autowired
    AuthRepository authRepository;
    @Autowired
    PasswordEncoder passwordEncoder;


    @GetMapping("/get-me/{email}")
    public HttpEntity<?> getUserMe(@PathVariable String email) {
        UserDetails byEmail = authRepository.findByEmail(email);
        if (byEmail != null) {
            return ResponseEntity.ok(byEmail);
        }
        return null;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtDto> signIn(@RequestBody @Valid SignInDto data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var authUser = authenticationManager.authenticate(usernamePassword);
        // Foydalanuvchi ma'lumotlarini olish
        Users user = (Users) authUser.getPrincipal();
        // Token yaratish
        var accessToken = tokenService.generateAccessToken(user);
        UserDto userDto = new UserDto(user.getId(), user.getName(), user.getSurname(), user.getEmail());
        // Token va foydalanuvchi ID bilan javob qaytarish
        return ResponseEntity.ok(new JwtDto(accessToken, userDto));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> signUp(@RequestBody @Valid SignUpDto data) {
        ResponseEntity<ApiResponse> apiResponseResponseEntity = service.signUp(data);
        return ResponseEntity.ok(apiResponseResponseEntity).getBody();
    }
}

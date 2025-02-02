package it.movie.movie_animation.payload;

import lombok.Data;

import java.util.UUID;

@Data
public class ApiResponse {
    private String message;
    private boolean success;
    private UUID id;

    public ApiResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    public ApiResponse(String message, boolean success, UUID id) {
        this.message = message;
        this.success = success;
        this.id = id;
    }
}

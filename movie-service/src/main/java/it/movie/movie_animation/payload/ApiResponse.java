package it.movie.movie_animation.payload;

import lombok.Data;

import java.util.UUID;

@Data
public class ApiResponse {
    private String accessToken;
    private String message;
    private boolean success;
    private UUID id;
    private int likeSize;

    public ApiResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    public ApiResponse(String accessToken, boolean success, UUID id) {
        this.accessToken = accessToken;
        this.success = success;
        this.id = id;
    }

    public ApiResponse(String message, boolean success, int likeSize) {
        this.message = message;
        this.success = success;
        this.likeSize = likeSize;
    }
}

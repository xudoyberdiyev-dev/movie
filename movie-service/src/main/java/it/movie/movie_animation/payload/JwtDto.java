package it.movie.movie_animation.payload;

import java.util.UUID;

public record JwtDto(
        String accessToken,
        UUID id) {
}
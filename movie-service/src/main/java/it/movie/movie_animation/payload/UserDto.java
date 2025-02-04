package it.movie.movie_animation.payload;

import java.util.UUID;

public record UserDto(
        UUID id,
        String name,
        String surname,
        String email
) {
}

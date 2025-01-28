package it.movie.movie_animation.payload;

import java.util.UUID;

public record ResVideoDto(
        UUID id,
        String title,
        String video
) {
}

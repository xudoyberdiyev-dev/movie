package it.movie.movie_animation.payload;

import java.sql.Timestamp;
import java.util.UUID;

public record ResComplaintDto(
        UUID id,
        String message,
        String userName,
        String userSurname,
        Timestamp createdAt
) {
}

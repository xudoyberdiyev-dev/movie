package it.movie.movie_animation.payload;

import java.sql.Timestamp;

public record ResComplaintDto(
        String message,
        String userName,
        String userSurname,
        Timestamp createdAt
) {
}

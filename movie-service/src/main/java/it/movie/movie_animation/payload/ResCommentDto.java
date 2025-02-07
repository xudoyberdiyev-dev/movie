package it.movie.movie_animation.payload;

import java.sql.Timestamp;

public record ResCommentDto(
        String text,
        String userName,
        String userSurname,
        Timestamp createdAt
) {
}

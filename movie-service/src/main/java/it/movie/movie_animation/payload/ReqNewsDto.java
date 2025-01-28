package it.movie.movie_animation.payload;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ReqNewsDto(
        String name,
        String img,
        LocalDate startDate,
//        LocalDateTime startDate,
        LocalDate endDate
//        LocalDateTime endDate
) {
}

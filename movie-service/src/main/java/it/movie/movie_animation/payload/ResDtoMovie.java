package it.movie.movie_animation.payload;

import org.springframework.data.domain.Pageable;

import java.util.List;

public record ResDtoMovie(
        List<ResMovieDto> resMovieDtos,
        Pageable pageable
) {
}

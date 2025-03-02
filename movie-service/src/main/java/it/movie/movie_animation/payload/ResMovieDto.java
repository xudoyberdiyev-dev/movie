package it.movie.movie_animation.payload;

import it.movie.movie_animation.entity.enums.Age;
import lombok.Builder;

import java.util.UUID;
@Builder
public record ResMovieDto(
        UUID id,
        String name,
        String description,
        Integer movieTime,
        Integer movieYear,
        String movieCountry,
        String language,
        Integer botId,
        String photo,
        String video,
        boolean active,
        java.util.List<it.movie.movie_animation.entity.enums.Genre> genres,
        it.movie.movie_animation.entity.enums.SubCategoryType subCategoryType,
        Age age,
        double seeSize
) {
}

package it.movie.movie_animation.payload;

import com.fasterxml.jackson.annotation.JsonValue;
import it.movie.movie_animation.entity.enums.Age;
import it.movie.movie_animation.entity.enums.Genre;
import it.movie.movie_animation.entity.enums.SubCategoryType;

import java.util.List;
import java.util.Set;

public record ReqMovieDto(
        SubCategoryType subCategoryType,
        Age age,
        String name,
        Integer movieTime,
        Integer movieYear,
        String movieCountry,
        String language,
        Integer botId,
        String description,
        String img,
        String video,
        boolean active,
        List<String> genres
) {
}

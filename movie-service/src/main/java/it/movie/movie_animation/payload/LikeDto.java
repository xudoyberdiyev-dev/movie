package it.movie.movie_animation.payload;

import java.util.UUID;

public record LikeDto(
        UUID movieId,
        boolean liked,//bu like bosilgan yoki yoqligini bildradi
        int likesCount//bu bosilgan like true bolgan sonini hisoblaydi agar true bolsa +1 boladi

) {
}

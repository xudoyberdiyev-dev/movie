package it.movie.movie_animation.service;

import it.movie.movie_animation.entity.LikeMovie;
import it.movie.movie_animation.entity.Movie;
import it.movie.movie_animation.entity.Users;
import it.movie.movie_animation.entity.Video;
import it.movie.movie_animation.entity.enums.Genre;
import it.movie.movie_animation.implment.service.MovieServiceImpl;
import it.movie.movie_animation.payload.*;
import it.movie.movie_animation.repository.AuthRepository;
import it.movie.movie_animation.repository.LikeRepository;
import it.movie.movie_animation.repository.MovieRepository;
import it.movie.movie_animation.repository.VideoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieService implements MovieServiceImpl {
    private final MovieRepository movieRepository;
    private final VideoRepository videoRepository;
    private final LikeRepository likeRepository;
    private final AuthRepository authRepository;

    public List<Movie> getMoviesByGenre(Genre genre) {
        return movieRepository.findByGenresContaining(genre);
    }

    public List<Movie> searchMovies(String searchQuery) {
        if (searchQuery == null || searchQuery.trim().isEmpty()) {
            throw new IllegalArgumentException("Search query cannot be empty");
        }

        return movieRepository.searchByNameIgnoreCase(searchQuery);
    }

    @Override
    public List<ResMovieDto> getMovie() {
        List<ResMovieDto> resMovieDtos = new ArrayList<>();
        for (Movie movie : movieRepository.findAll()) {
            resMovieDtos.add(new ResMovieDto(
                    movie.getId(),
                    movie.getName(),
                    movie.getDescription(),
                    movie.getMovieTime(),
                    movie.getMovieYear(),
                    movie.getMovieCountry(),
                    movie.getLanguage(),
                    movie.getBotId(),
                    movie.getImg(),
                    movie.getVideo(),
                    movie.isActive(),
                    movie.getGenres(),
                    movie.getSubCategoryType(),
                    movie.getAge(),
                    movie.getSeeSize()
            ));
        }
        return resMovieDtos;
    }

    @Override
    public ApiResponse createMovie(ReqMovieDto reqMovieDto) {
        if (!movieRepository.existsMovieByNameEqualsIgnoreCase(reqMovieDto.name())) {
            try {
                List<Genre> genreList = new ArrayList<>();
                for (String genre : reqMovieDto.genres()) {
                    genreList.add(Genre.valueOf(genre));
                }

                movieRepository.save(Movie.builder()
                        .subCategoryType(reqMovieDto.subCategoryType())
                        .img(reqMovieDto.img())
                        .age(reqMovieDto.age())
                        .video(reqMovieDto.video()).genres(genreList).name(reqMovieDto.name()).movieTime(reqMovieDto.movieTime()).movieCountry(reqMovieDto.movieCountry()).language(reqMovieDto.language()).movieYear(reqMovieDto.movieYear()).botId(reqMovieDto.botId()).description(reqMovieDto.description()).active(false).build());

                return new ApiResponse("film saqlandi", true);
            } catch (NullPointerException | ResourceNotFoundException e) {
                return new ApiResponse("Xatolik", false);
            }
        }
        return new ApiResponse("bunday nomi film allaqachon mavjud", false);
    }

    @Override
    public ApiResponse updateMovie(ReqMovieDto movieDto, UUID id) {
        try {
            if (movieRepository.existsByNameAndIdNot(movieDto.name(), id)) {
                return new ApiResponse("Bunday nomdagi kino avvaldan mavjud", false);
            }
            Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Movie not found"));
            movie.setName(movieDto.name());
            movie.setDescription(movieDto.description());
            movie.setMovieTime(movieDto.movieTime());
            movie.setLanguage(movieDto.language());
            movie.setMovieCountry(movieDto.movieCountry());
            movie.setMovieYear(movieDto.movieYear());
            movie.setBotId(movieDto.botId());
            movie.setDescription(movieDto.description());
            movie.setSubCategoryType(movieDto.subCategoryType());
            movie.setAge(movieDto.age());
            movie.setVideo(movieDto.video());
            movie.setImg(movieDto.img());
            movieRepository.save(movie);
            return new ApiResponse("film taxrirlandi", true);
        } catch (ResourceNotFoundException e) {
            return new ApiResponse("Xatolik", false);
        }
    }

    @Override
    public ApiResponse deleteMovie(UUID id) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Movie not found"));
        movieRepository.delete(movie);
        return new ApiResponse("movie o'chirib tashlandi", true);
    }

    @Override
    public ApiResponse updateActive(UUID id, boolean active) {
        try {
            Movie movie = movieRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Movie not found"));
            movie.setActive(active);
            movieRepository.save(movie);
            if (movie.isActive()) {
                return new ApiResponse("Kino premyera oynasiga o'tdi", true);
            } else {
                return new ApiResponse("Kino premyeralar oynasidan olindi", true);
            }
        } catch (ResourceNotFoundException e) {
            return new ApiResponse("Xatolik: " + e.getMessage(), false);
        }
    }

    @Override
    public List<Movie> getActiveMovies(boolean active) {
        return movieRepository.findByActive(active);
    }

    @Override
    @Transactional
    public ApiResponse createSerial(UUID id, ReqVideoDto reqVideoDto) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("movie not found"));
        if (reqVideoDto.video() != null) {
            Video save = videoRepository.save(
                    Video.builder()
                            .title(reqVideoDto.title())
                            .video(reqVideoDto.video())
                            .build()
            );
            movie.getVideos().add(save);
            movieRepository.saveAndFlush(movie);  // saveAndFlush
            return new ApiResponse("Serial saqlandi", true);
        }
        return new ApiResponse("Serial saqlashda xatolik", false);
    }

    @Override
    public List<ResVideoDto> getNewSerial(UUID id) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("movie not fount"));
        List<ResVideoDto> videoDtos = new ArrayList<>();
        for (Video video : movie.getVideos()) {
            videoDtos.add(
                    new ResVideoDto(
                            video.getId(),
                            video.getTitle(),
                            video.getVideo()
                    )
            );
        }
        System.out.println("Returned Videos: " + videoDtos.size()); // Bu yerda video sonini tekshiring
        return videoDtos;
    }

    @Override
    public ApiResponse deleteSerial(UUID id, UUID videoId) {
        try {
            Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("get movie"));
            Video video = videoRepository.findById(videoId).orElseThrow(() -> new ResourceNotFoundException("get video"));
            boolean b = movie.getVideos().removeIf(v -> v.getId().equals(videoId));
            if (!b) {
                return new ApiResponse("Bunday ID lik video topilmadi", false);
            }
            movieRepository.save(movie);
            videoRepository.delete(video);
            return new ApiResponse("Serial qismi ochirildi", true);
        } catch (Exception e) {
            return new ApiResponse("Serial qismini ochirishda xatolik", false);
        }
    }

    @Override
    public ApiResponse updateSerial(UUID id, UUID videoId, ReqVideoDto reqVideoDto) {
        try {
            movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getMovie"));
            Video video = videoRepository.findById(videoId).orElseThrow(() -> new ResourceNotFoundException("getVideo"));
            video.setTitle(reqVideoDto.title());
            video.setVideo(reqVideoDto.video());
            videoRepository.save(video);
            return new ApiResponse("Serial taxrirandi", true);
        } catch (Exception e) {
            return new ApiResponse("Taxrirlashda xatolik", false);
        }
    }

    public ApiResponse sendLike(UUID movieId, UUID userId, String action) {
        // Foydalanuvchi va kino topish
        Users user = authRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        // Foydalanuvchi avval like bosganmi?
        Optional<LikeMovie> existingLike = likeRepository.findByUserAndMovie(user, movie);

        if ("like".equalsIgnoreCase(action)) {
            if (existingLike.isPresent()) {
                LikeMovie likeMovie = existingLike.get();
                if (!likeMovie.isActiveLike()) {
                    likeMovie.setActiveLike(true);
                    movie.setLikeSize(movie.getLikeSize() + 1);
                    likeRepository.save(likeMovie);
                }
            } else {
                LikeMovie newLike = new LikeMovie(user, movie, true);
                likeRepository.save(newLike);
                movie.setLikeSize(movie.getLikeSize() + 1);
            }
        } else if ("unlike".equalsIgnoreCase(action)) {
            if (existingLike.isPresent()) {
                LikeMovie likeMovie = existingLike.get();
                if (likeMovie.isActiveLike()) {
                    likeRepository.delete(likeMovie); // LikeMovie obyektini o‘chirib tashlaymiz
                    movie.setLikeSize(Math.max(0, movie.getLikeSize() - 1));
                }
            }
        }

        // Kino obyektini saqlaymiz
        movieRepository.save(movie);

        return new ApiResponse("Like action processed", true, movie.getLikeSize());
    }

    // Ushbu metod frontendda userning like bosgan filmlarini olish uchun ishlatiladi
    public List<Movie> getLikedMovies(UUID userId) {
        Users user = authRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return likeRepository.findLikedMoviesByUser(user);
    }

    // Foydalanuvchi ma'lum bir kinoga like bosgan yoki yo'qligini tekshirish
    public boolean isMovieLiked(UUID movieId, UUID userId) {
        Users user = authRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        return likeRepository.existsByUserAndMovieAndActiveLike(user, movie, true);
    }





}




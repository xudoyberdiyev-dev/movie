package it.movie.movie_animation.controller;

import it.movie.movie_animation.entity.Movie;
import it.movie.movie_animation.entity.enums.Genre;
import it.movie.movie_animation.entity.enums.SubCategoryType;
import it.movie.movie_animation.implment.controller.MovieControllerImpl;
import it.movie.movie_animation.payload.*;
import it.movie.movie_animation.repository.MovieRepository;
import it.movie.movie_animation.service.MovieService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/movie")
@CrossOrigin
@RequiredArgsConstructor
public class MovieController implements MovieControllerImpl {
    private final MovieService movieService;

    private final MovieRepository movieRepository;

    @Override
    @GetMapping("/list")
    public HttpEntity<?> getMovie() {
        return ResponseEntity.ok(movieService.getMovie());
    }

    @Override
    @GetMapping("/active")//kino active true bolsa premyeralar oynasiga chiqadi flase bolganda yoqoladi
    public HttpEntity<?> getActiveMovie(boolean active) {
        List<Movie> activeMovies = movieService.getActiveMovies(true);
        return ResponseEntity.ok(activeMovies);
    }

    @Override
    @GetMapping("/random")//tasodifiy kinolar chiqadi
    public HttpEntity<?> getRandomMovies(@RequestParam(defaultValue = "5") int count) {
        List<Movie> randomMovies = movieRepository.findRandomMovies(count);
        return ResponseEntity.ok(randomMovies);
    }

    @Override
    @GetMapping("/{id}")
    public HttpEntity<?> getOneMovie(@PathVariable UUID id) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new RuntimeException("Movie not found"));
        return ResponseEntity.ok(movie);
    }

    @Override
    @GetMapping("/by-genre")//genre boyicha kino chiqadi
    public HttpEntity<?> getMoviesByGenre(@RequestParam Genre genre, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "24") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Movie> moviesByGenre = movieService.getMoviesByGenre(genre, pageable);
        return ResponseEntity.ok(moviesByGenre);
    }


    @PostMapping("/{id}/see-size") //faqat kinoni ichiga kirib kinoni ustiga bosib kora see size oshadi
    private HttpEntity<?> playSeeSize(@PathVariable UUID id) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("get movie"));
        movie.setSeeSize(movie.getSeeSize() + 0.5);
        movieRepository.save(movie);
        return ResponseEntity.ok(movie);
    }

    @Override
    @PostMapping
    public HttpEntity<?> createMovie(@RequestBody ReqMovieDto reqMovieDto) {
        ApiResponse apiResponse = movieService.createMovie(reqMovieDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @Override
    @PutMapping("/{id}")
    public HttpEntity<?> updateMovie(@RequestBody ReqMovieDto movieDto, @PathVariable UUID id) {
        ApiResponse apiResponse = movieService.updateMovie(movieDto, id);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @Override
    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteMovie(@PathVariable UUID id) {
        ApiResponse apiResponse = movieService.deleteMovie(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @Override
    @PutMapping("/active/{id}")//kino activeni almashtrish true bolsa premyera oynasiga chiqadi false bolsa yoqoladi
    public HttpEntity<?> updateActive(@PathVariable UUID id, @RequestParam boolean active) {
        ApiResponse apiResponse = movieService.updateActive(id, active);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @Override
    @PostMapping("/add-serial/{id}")//serial qolgan qismlarni qoshish
    public HttpEntity<?> createSerial(@PathVariable UUID id, @RequestBody ReqVideoDto reqVideoDto) {
        ApiResponse apiResponse = movieService.createSerial(id, reqVideoDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @Override
    @GetMapping("/new-serial/{id}")//qoshilgan seriallarni korish
    public HttpEntity<?> getSerial(@PathVariable UUID id) {
        List<ResVideoDto> newSerial = movieService.getNewSerial(id);
        return ResponseEntity.ok(newSerial);
    }

    @Override
    @DeleteMapping("/serial-delete/{id}")
    public HttpEntity<?> deleteSerial(@PathVariable UUID id, @RequestParam UUID videoId) {
        ApiResponse apiResponse = movieService.deleteSerial(id, videoId);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.OK : HttpStatus.CONFLICT).body(apiResponse);
    }

    @Override
    @PutMapping("/serial-edite/{id}")
    public HttpEntity<?> updateSerial(@PathVariable UUID id, @RequestParam UUID videoId, @RequestBody ReqVideoDto reqVideoDto) {
        ApiResponse apiResponse = movieService.updateSerial(id, videoId, reqVideoDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @PostMapping("like-send/{id}/{action}")
    public ResponseEntity<ApiResponse> toggleLike(@PathVariable UUID id, @PathVariable String action, @RequestParam UUID userId) {
        ApiResponse response = movieService.sendLike(id, userId, action);
        return ResponseEntity.status(response.isSuccess() ? HttpStatus.OK : HttpStatus.CONFLICT).body(response);
    }

    @GetMapping("/liked/{userId}")
    public ResponseEntity<List<Movie>> getLikedMovies(@PathVariable UUID userId) {
        return ResponseEntity.ok(movieService.getLikedMovies(userId));
    }

    @GetMapping("/{movieId}/status")
    public ResponseEntity<Boolean> isMovieLiked(@PathVariable UUID movieId, @RequestParam UUID userId) {
        boolean movieLiked = movieService.isMovieLiked(movieId, userId);
        return ResponseEntity.ok(movieLiked);
    }

    @GetMapping("/search")
    public List<Movie> searchMovies(@RequestParam String query) {
        return movieRepository.findByNameContainingIgnoreCase(query);
    }

}

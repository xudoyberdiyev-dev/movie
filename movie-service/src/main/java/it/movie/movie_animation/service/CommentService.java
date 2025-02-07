package it.movie.movie_animation.service;

import it.movie.movie_animation.entity.Comment;
import it.movie.movie_animation.entity.Movie;
import it.movie.movie_animation.entity.Users;
import it.movie.movie_animation.payload.ApiResponse;
import it.movie.movie_animation.payload.ReqCommentDto;
import it.movie.movie_animation.payload.ResCommentDto;
import it.movie.movie_animation.payload.ResComplaintDto;
import it.movie.movie_animation.repository.AuthRepository;
import it.movie.movie_animation.repository.CommentRepository;
import it.movie.movie_animation.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final AuthRepository authRepository;
    private final MovieRepository movieRepository;
    private final CommentRepository commentRepository;

    public ApiResponse addComment(UUID movieId, ReqCommentDto reqCommentDto, Authentication authentication) {
        try {
            if (authentication == null || !authentication.isAuthenticated()) {
                return new ApiResponse("Royxatdan otmahansz", false);
            }
            String email = authentication.getName();

            UserDetails users = authRepository.findByEmail(email);
            Movie movie = movieRepository.findById(movieId).orElseThrow(() -> new ResourceNotFoundException("get Movie"));

            commentRepository.save(
                    Comment.builder()
                            .text(reqCommentDto.text())
                            .movie(movie)
                            .users((Users) users)
                            .build()
            );
            return new ApiResponse("Komment olindi", true);
        } catch (Exception e) {
            return new ApiResponse("comment yozishda hatolik", false);
        }
    }

    public List<ResCommentDto> getCommentAll(UUID id) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getMovie"));
        List<Comment> comments = commentRepository.findByMovie(movie);

        return comments.stream().map(comment -> new ResCommentDto(
                comment.getText(),
                comment.getUsers().getName(),
                comment.getUsers().getSurname(),
                comment.getCreatedAt()
        )).collect(Collectors.toList());
    }
}

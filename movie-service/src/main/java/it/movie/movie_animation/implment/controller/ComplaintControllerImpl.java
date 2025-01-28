package it.movie.movie_animation.implment.controller;

import it.movie.movie_animation.payload.ReqComplaintDto;
import org.springframework.http.HttpEntity;
import org.springframework.security.core.Authentication;

import java.util.UUID;

public interface ComplaintControllerImpl {

    HttpEntity<?> addComplaint(ReqComplaintDto reqComplaintDto, Authentication authentication);

    HttpEntity<?> deleteComplaint(UUID id);

    HttpEntity<?> getAllMessage();
}

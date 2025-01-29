import React from 'react';
import {Box, IconButton, Modal, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Mobil mosligi uchun kenglikni moslash
    maxWidth: 500, // Maksimal kenglik
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2, // Modal burchaklarini yumaloqlash
};

export const ImageModal = ({open, onClose, imageUrl, description}) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="image-modal-title">
            <Box sx={modalStyle}>
                {/* Yopish tugmasi */}
                <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                    <IconButton onClick={onClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                </Box>

                {/* Rasm */}
                <img
                    src={imageUrl}
                    alt="Modal"
                    style={{maxWidth: '100%', height: 'auto', borderRadius: 8}}
                />

                {/* Matn */}
                <Typography
                    variant="body1"
                    sx={{
                        mt: 2, // Yuqori oraliq
                        whiteSpace: 'pre-wrap', // Matnni satr bo‘yicha ajratish
                        wordWrap: 'break-word', // Uzoq so‘zlarni ajratish
                        overflowY: 'auto', // Skrollni qo‘shish
                        maxHeight: '50vh', // Modal ichidagi balandlikni cheklash
                    }}
                >
                    {description}
                </Typography>
            </Box>
        </Modal>
    );
};

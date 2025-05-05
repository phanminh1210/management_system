import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CardMedia, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function ProductDetail() {
    const { id } = useParams();
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [productDetail, setProductDetail] = useState(null);
    const [description, setDescription] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8111/api/v1/categories/products/images/${id}`)
            .then(res => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setImages(res.data);
                    setSelectedImage(res.data[0]);
                }
            }).catch(err => console.error("Image fetch error:", err));

        axios.get(`http://localhost:8111/api/v1/categories/products/detail/${id}`)
            .then(res => setProductDetail(res.data))
            .catch(err => console.error("Detail fetch error:", err));

        axios.get(`http://localhost:8111/api/v1/categories/products/description/${id}`)
            .then(res => setDescription(res.data))
            .catch(err => console.error("Description fetch error:", err));
    }, [id]);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Chi tiết sản phẩm
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                {/* Phần ảnh bên trái */}
                <Box>
                    {selectedImage && (
                        <CardMedia
                            component="img"
                            image={`http://localhost:8111${selectedImage}`}
                            alt="Ảnh sản phẩm lớn"
                            sx={{
                                width: 500,
                                height: 400,
                                objectFit: 'cover',
                                borderRadius: 2,
                                boxShadow: 3
                            }}
                        />
                    )}
                    <Grid container spacing={2} sx={{ marginTop: 2, width: 500 }}>
                        {images.map((imageUrl, index) => (
                            <Grid item xs={3} key={index}>
                                <CardMedia
                                    component="img"
                                    image={`http://localhost:8111${imageUrl}`}
                                    alt={`Ảnh ${index + 1}`}
                                    onClick={() => setSelectedImage(imageUrl)}
                                    sx={{
                                        width: '100%',
                                        height: 100,
                                        objectFit: 'cover',
                                        cursor: 'pointer',
                                        borderRadius: 1,
                                        border: selectedImage === imageUrl ? '2px solid #1976d2' : '1px solid #ccc',
                                        boxShadow: selectedImage === imageUrl ? 3 : 1
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Thông tin bên phải */}
                <Box sx={{ flex: 1 }}>
                    {productDetail && (
                        <>
                            <Typography variant="h5">{productDetail.name}</Typography>
                            <Typography variant="h6" color="text.secondary">
                                {productDetail.price.toLocaleString('vi-VN')} ₫
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <StarIcon sx={{ color: '#fbc02d', verticalAlign: 'middle' }} />
                                {productDetail.avgRating.toFixed(1)} / 5 ({productDetail.countRating} đánh giá)
                            </Typography>
                        </>
                    )}
                    {description && (
                        <Typography sx={{ mt: 3 }} variant="body1">
                            {description}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

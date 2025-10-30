/**
 * 404 Not Found middleware
 */
const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Маршрут ${req.originalUrl} не найден`
    }
  });
};

module.exports = notFound;


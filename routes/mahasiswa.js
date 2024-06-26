var express = require('express');
var router = express.Router();
const { login, requireAuth } = require('../middleware/auth');
const kegiatanController = require('../controllers/kegiatan');
const pendaftarController = require('../controllers/pendaftar');
const { getKegiatan, detailKegiatan, daftarKegiatan } = require('../controllers/KegiatanController');
const ctrlMhs = require('../controllers/profile');
const upload = require('../middleware/multer');

// Existing routes
router.get('/home', requireAuth, getKegiatan, function(req, res, next) {
  res.render('homeUser', { title: 'Transkrip Nilai' });
});

router.get('/ajukan-kegiatan', requireAuth, kegiatanController.view);
router.get('/ajukan-kegiatan/add', requireAuth, (req, res) => {
  res.render('addkegiatan', { title: "Tambah Kegiatan" });
});
router.post('/ajukan-kegiatan/store', requireAuth, kegiatanController.store);
router.post('/ajukan-kegiatan/pembayaran/proses', requireAuth, kegiatanController.prosesPembayaran);
router.get('/ajukan-kegiatan/delete/:id', requireAuth, kegiatanController.deleteEvent);
router.get('/ajukan-kegiatan/detail/:id', requireAuth, kegiatanController.detail);

router.get('/profile', requireAuth, ctrlMhs.getUmum);
router.post('/profile/update', upload.single('cv2'), requireAuth, ctrlMhs.fillMhs);
router.get('/error', function(req, res, next) {
  res.render('error', { title: 'Transkrip Nilai', message: 'You need to log in to access this page' });
});

// New routes for pendaftar
router.get('/ajukan-kegiatan/:idKegiatan/pendaftar', requireAuth, pendaftarController.view);
router.post('/ajukan-kegiatan/pendaftar/:idPendaftaran/setujui', requireAuth, pendaftarController.setujui);
router.post('/ajukan-kegiatan/pendaftar/:idPendaftaran/tolak', requireAuth, pendaftarController.tolak);

module.exports = router;

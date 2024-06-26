const bcrypt = require("bcrypt");
const { User, Umum } = require("../models");
var session = require('express-session');

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Debug logging
        console.log("Login attempt:", email);

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.redirect('/auth'); // Redirect to login page
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.redirect('/auth'); // Redirect to login page
        }

        // Set session
        req.session.userId = user.id;
        req.session.userRole = user.role;
        console.log("Login successful for user:", email);
        if (user.role == "user") {
            return res.redirect("/home");
        } else if (user.role == "admin") {
            return res.redirect("/admin/dashboard");
        }
    } catch (error) {
        console.error("Login error:", error);
        next(error);
    }
};

const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/auth'); // Redirect to login page
    }
    next();
};
const redirectIfAuthenticated = (req, res, next) => {
    if (req.session.userRole==='user') {
        return res.redirect('/'); // Redirect to home page if authenticated
    } else if   (req.session.userRole==='admin') {
        return res.redirect('/admin/dashboard'); // Redirect to home page if authenticated
    }
    next();
};
const logout = (req, res, next) => {
    // Hapus data sesi yang relevan
     console.log("user id adalah"+ req.session.userId);
    req.session.destroy((err) => {
        if (err) {
            console.error("Error while logging out:", err);
            return next(err);
        }
        // Redirect pengguna ke halaman login setelah logout
        console.log("Logout successful");
       

        res.redirect('/auth');
    });
};

const daftar = async (req, res) => {
    try {
    console.log(req.body);
    const { username,nik,alamat, tanggalLahir,email, newPassword, hp } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const newUser = await User.create({
        username : username,
        email: email,
        password: hashedPassword,
        hp:hp,
    });

    const newUmum= await Umum.create({
        idUser: newUser.id,
        nik: nik,
        nama: username,
        alamat: alamat,
        tanggalLahir: tanggalLahir,
   
    });
    res.status(200).json({ message: 'Data berhasil disimpan', data: newUser });
    } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
    }
};


module.exports = { login, requireAuth,redirectIfAuthenticated,logout,daftar };
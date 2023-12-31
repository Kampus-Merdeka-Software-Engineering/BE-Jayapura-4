const User = require('../model/users');

const postSignup = async (req, res) => {
  const { namaLengkap, email, password } = req.body;

  // Validasi data (contoh: periksa apakah email sudah digunakan)
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: 'Email sudah digunakan' });
  }

  // Jika data valid, simpan pengguna ke database
  const user = await User.create({ namaLengkap, email, password });

  res.status(201).json({ message: 'Pendaftaran berhasil' });
};

// Controller untuk masuk (Login)
async function postLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });

    if (user) {
      res.status(200).json({ message: 'Login berhasil', user });
    } else {
      res.status(401).json({ message: 'Login gagal' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat login' });
  }
}

module.exports = {
  postSignup,
  postLogin,
};

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import store from './store.png';
import React, {useState} from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './App.css';

const newsData = [
    {
        id: 1,
        title: "Новость номер 1",
        description: "Description of news headline 1, a brief summary of the news.",
        date: "2024-05-16"
    },
    {
        id: 2,
        title: "Новость номер 2",
        description: "Description of news headline 2, covering different aspects.",
        date: "2024-05-15"
    },
    {
        id: 3,
        title: "Новость номер 3",
        description: "Detailed discussion of news headline 3, more in-depth analysis.",
        date: "2024-05-14"
    }
];
const initialNewsData = [
    { id: 1, title: "News Headline 1", description: "Description of news headline 1, a brief summary of the news.", date: "2024-05-16" },
    { id: 2, title: "News Headline 2", description: "Description of news headline 2, covering different aspects.", date: "2024-05-15" },
    { id: 3, title: "News Headline 3", description: "Detailed discussion of news headline 3, more in-depth analysis.", date: "2024-05-14" }
];

const productData = [
    {
        id: 1,
        product: "Продукт A",
        description: "Описание продукта A",
        price: "1000 руб."
    },
    {
        id: 2,
        product: "Продукт B",
        description: "Описание продукта B",
        price: "2000 руб."
    },
    {
        id: 3,
        product: "Услуга C",
        description: "Описание услуги C",
        price: "1500 руб."
    }
];


const NewsItem = ({ title, description, date }) => (
    <div className="news-item">
        <h3>{title}</h3>
        <p>{description}</p>
        <p className="news-date">{date}</p>
    </div>
);
const NewsForm = ({ onSave, initialData = {} }) => {
    const [newsItem, setNewsItem] = useState(initialData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewsItem(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(newsItem);
        setNewsItem({}); // Reset form after saving
    };

    return (
        <form onSubmit={handleSubmit} className="news-form">
            <input type="text" name="title" value={newsItem.title || ''} onChange={handleChange} placeholder="Title"
                   required/>
            <textarea name="description" value={newsItem.description || ''} onChange={handleChange}
                      placeholder="Description" required/>
            <input type="date" name="date" value={newsItem.date || ''} onChange={handleChange} required/>
            <button type="submit">Save News</button>
        </form>
    );
};

const ProductsServices = () => (
    <article className="main-content">
        <h2>Продукты или услуги</h2>
        <table>
            <thead>
            <tr>
                <th>Продукт</th>
                <th>Описание</th>
                <th>Цена</th>
            </tr>
            </thead>
            <tbody>
            {productData.map(({id, product, description, price}) => (
                <tr key={id}>
                    <td>{product}</td>
                    <td>{description}</td>
                    <td>{price}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </article>
);


const News = () => (
    <article className="main-content">
        {newsData.map(news => (
            <NewsItem key={news.id} {...news} />
        ))}
    </article>
);

const AboutOwner = () => (
    <article className="main-content">
        <h2>Екатерина Нечаева</h2>
        <p>Южный Федеральный Университет</p>
        {/* Additional content about the owner */}
    </article>
);

const FeedBack = () => (
    <article className="main-content">
        <h2>Обратная связь</h2>
        <p>eknechaeva@sfedu.ru</p>
        <p>8-800-555-35-35</p>
        {/* Additional content about the owner */}
    </article>
);

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        // event.preventDefault();
        onLogin(username, password);
    };

    return (
        <article className="main-content">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </article>
    );
};

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (username, password) => {
        if (username === "admin" && password === "admin") {
            setIsLoggedIn(true);
            navigate('/');
        } else {
            alert('Invalid credentials');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {isLoggedIn ? (
                    <div>
                        <button onClick={handleLogout}>Выход</button>
                    </div>
                ) : (
                    <Link to="/login">Войти</Link>
                )}
            </header>
            <div className="content-area">
                <section className="sidebar">
                    <nav>
                        <ul>
                            <li><Link to="/">Новости</Link></li>
                            <li><Link to="/about-owner">О создателе</Link></li>
                            <li><Link to="/feedback">Обратная связь</Link></li>
                            <li><Link to="/products">Продукты и услуги</Link></li>
                        </ul>
                    </nav>
                </section>
                <Routes>
                <Route path="/" element={<News />} />
                    <Route path="/about-owner" element={<AboutOwner />} />
                    <Route path="/feedback" element={<FeedBack />} />
                    <Route path="/products" element={<ProductsServices />} />
                    <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                </Routes>
                <aside className="sidebar-right">
                    <img src={store} className="store" alt="logo"/>
                </aside>
            </div>
            <footer className="App-footer">
                Сайт создан 2024-05-17 © Екатерина Нечаева
            </footer>
        </div>
    );
}

export default App;

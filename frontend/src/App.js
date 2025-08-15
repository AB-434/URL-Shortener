import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { motion } from 'framer-motion';
import { 
  LinkIcon, 
  ClipboardDocumentIcon, 
  ArrowPathIcon, 
  ChartBarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

// Define CSS styles as JavaScript objects
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: '100vh',
    color: '#212529',
    lineHeight: 1.6,
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  headerTitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    background: 'linear-gradient(to right, #4361ee, #f72585)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  headerSubtitle: {
    fontSize: '1.1rem',
    color: '#666',
    maxWidth: '600px',
    margin: '0 auto',
  },
  urlForm: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
    transition: 'all 0.3s ease',
  },
  formGroup: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  formInput: {
    flex: 1,
    padding: '0.8rem 1rem',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  },
  formInputFocus: {
    outline: 'none',
    borderColor: '#4361ee',
  },
  btn: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#4361ee',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  btnHover: {
    backgroundColor: '#3a0ca3',
    transform: 'translateY(-2px)',
  },
  btnSecondary: {
    backgroundColor: '#f72585',
  },
  resultContainer: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  resultTitle: {
    fontSize: '1.2rem',
    color: '#3a0ca3',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  resultUrl: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  urlLink: {
    color: '#4361ee',
    textDecoration: 'none',
    wordBreak: 'break-all',
  },
  urlList: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  urlListTitle: {
    fontSize: '1.5rem',
    color: '#3a0ca3',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableCell: {
    padding: '1rem',
    textAlign: 'left',
    borderBottom: '1px solid #eee',
  },
  tableHeader: {
    backgroundColor: '#f8f9fa',
    fontWeight: 600,
    color: '#3a0ca3',
  },
  errorMessage: {
    color: '#ff3333',
    backgroundColor: '#ffebee',
    padding: '0.8rem',
    borderRadius: '8px',
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  icon: {
    width: '1.25rem',
    height: '1.25rem',
  },
  loading: {
    display: 'inline-block',
    width: '1.5rem',
    height: '1.5rem',
    border: '3px solid rgba(255,255,255,.3)',
    borderRadius: '50%',
    borderTopColor: 'white',
    animation: 'spin 1s ease-in-out infinite',
  },
  '@keyframes spin': {
    to: { transform: 'rotate(360deg)' },
  },
};

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hoverState, setHoverState] = useState({});

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/urls');
      setUrls(response.data);
    } catch (err) {
      setError('Failed to fetch URLs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) {
      setError('Please enter a URL');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await axios.post('http://localhost:5000/shorten', {
        originalUrl
      });
      setShortUrl(`http://localhost:5000/${response.data.shortCode}`);
      fetchUrls();
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleHover = (element, isHovering) => {
    setHoverState(prev => ({ ...prev, [element]: isHovering }));
  };

  return (
    <div style={styles.container}>
      <motion.header 
        style={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={styles.headerTitle}>URL Shortener</h1>
        <p style={styles.headerSubtitle}>Create short, memorable links and track their performance</p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div 
          style={{
            ...styles.urlForm,
            boxShadow: hoverState.urlForm ? '0 10px 20px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={() => handleHover('urlForm', true)}
          onMouseLeave={() => handleHover('urlForm', false)}
        >
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <input
                type="url"
                style={{
                  ...styles.formInput,
                  ...(hoverState.formInput ? styles.formInputFocus : {})
                }}
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Paste your long URL here..."
                required
                onFocus={() => handleHover('formInput', true)}
                onBlur={() => handleHover('formInput', false)}
              />
              <button 
                type="submit" 
                style={{
                  ...styles.btn,
                  ...(hoverState.submitBtn ? styles.btnHover : {}),
                  ...(loading ? { opacity: 0.8 } : {})
                }}
                disabled={loading}
                onMouseEnter={() => handleHover('submitBtn', true)}
                onMouseLeave={() => handleHover('submitBtn', false)}
              >
                {loading ? (
                  <>
                    <ArrowPathIcon style={styles.loading} />
                    Processing...
                  </>
                ) : (
                  <>
                    <LinkIcon style={styles.icon} />
                    Shorten
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <motion.div 
              style={styles.errorMessage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ExclamationTriangleIcon style={styles.icon} />
              {error}
            </motion.div>
          )}
        </div>

        {shortUrl && (
          <motion.div 
            style={styles.resultContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 style={styles.resultTitle}>
              <LinkIcon style={styles.icon} />
              Your Short URL
            </h3>
            <div style={styles.resultUrl}>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={styles.urlLink}>
                {shortUrl}
              </a>
              <CopyToClipboard text={shortUrl} onCopy={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}>
                <button style={{
                  ...styles.btn,
                  ...styles.btnSecondary,
                  ...(hoverState.copyBtn ? { backgroundColor: '#d91a6a' } : {})
                }}
                onMouseEnter={() => handleHover('copyBtn', true)}
                onMouseLeave={() => handleHover('copyBtn', false)}
                >
                  <ClipboardDocumentIcon style={styles.icon} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </CopyToClipboard>
            </div>
          </motion.div>
        )}

        <div style={styles.urlList}>
          <h2 style={styles.urlListTitle}>
            <ChartBarIcon style={styles.icon} />
            Recently Shortened URLs
          </h2>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Original URL</th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Short URL</th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Clicks</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((url) => (
                  <tr key={url._id} style={{ ':hover': { backgroundColor: '#f8f9fa' } }}>
                    <td style={styles.tableCell}>
                      <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" style={styles.urlLink}>
                        {url.originalUrl.length > 50 
                          ? `${url.originalUrl.substring(0, 50)}...` 
                          : url.originalUrl}
                      </a>
                    </td>
                    <td style={styles.tableCell}>
                      <a href={`http://localhost:5000/${url.shortCode}`} target="_blank" rel="noopener noreferrer" style={styles.urlLink}>
                        http://localhost:5000/{url.shortCode}
                      </a>
                    </td>
                    <td style={styles.tableCell}>{url.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
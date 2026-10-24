import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-28 pb-16 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <Badge variant="gold">ERROR 404</Badge>

        <h1 className="text-7xl sm:text-8xl font-black font-heading text-gold-gradient tracking-tight">
          404
        </h1>

        <h2 className="text-2xl font-bold text-white font-heading">
          Coordinate Not Found
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed">
          The requested route does not exist or has been relocated within the JHRST Tech Solutions architecture.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="secondary" size="md" leftIcon={<Compass className="w-4 h-4" />}>
              Explore Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};


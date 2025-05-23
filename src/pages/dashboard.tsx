import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { 
  Loader2, Calendar, Phone, Mail, MapPin, 
  Truck, Package, Clock, CheckCircle, XCircle 
} from 'lucide-react';
import type { Quote } from '@/types/quote';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }

    if (status === 'authenticated') {
      fetchQuotes();
    }
  }, [status, router]);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/quotes');
      if (!response.ok) throw new Error('Failed to fetch quotes');
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuoteStatus = async (id: string, status: string) => {
    try {
      const quote = quotes.find(q => q.id === id);
      if (!quote) return;

      const response = await fetch(`/api/quotes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...quote, status }),
      });

      if (!response.ok) throw new Error('Failed to update quote');
      
      setQuotes(quotes.map(q => 
        q.id === id ? { ...q, status: status as Quote['status'] } : q
      ));
    } catch (error) {
      console.error('Error updating quote:', error);
    }
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'moving':
        return <Truck className="h-5 w-5 text-orange-500" />;
      case 'office':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'tv':
        return <Package className="h-5 w-5 text-green-500" />;
      case 'longDistance':
        return <Truck className="h-5 w-5 text-purple-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: Quote['status']) => {
    const badges = {
      PENDING: { bg: 'yellow', icon: Clock },
      CONFIRMED: { bg: 'blue', icon: CheckCircle },
      COMPLETED: { bg: 'green', icon: CheckCircle },
      CANCELLED: { bg: 'red', icon: XCircle }
    };

    const { bg, icon: Icon } = badges[status];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${bg}-100 text-${bg}-800`}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0) + status.slice(1).toLowerCase()}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Quotes</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Quotes</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quotes
          .filter(quote => filter === 'all' || quote.status === filter)
          .map(quote => (
            <div key={quote.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  {getServiceIcon(quote.serviceType)}
                  <span className="font-medium">{quote.name}</span>
                </div>
                {getStatusBadge(quote.status)}
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(quote.moveDate)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{quote.origin} → {quote.destination}</span>
                </div>
                {quote.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{quote.phone}</span>
                  </div>
                )}
              </div>

              {quote.status === 'PENDING' && (
                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={() => updateQuoteStatus(quote.id, 'CONFIRMED')}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateQuoteStatus(quote.id, 'CANCELLED')}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session }
  };
};
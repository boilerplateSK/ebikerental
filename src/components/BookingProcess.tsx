import { useState } from 'react';
import { Calendar, Clock, CreditCard, CheckCircle, Loader } from 'lucide-react';

// Mock shadcn/ui components
const Button = ({ children, variant = 'default', size = 'default', className = '', onClick, disabled, ...props }) => {
  const baseClass = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 bg-gray-900 text-white hover:bg-gray-800',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground border-gray-300 hover:bg-gray-50',
    ghost: 'hover:bg-accent hover:text-accent-foreground hover:bg-gray-100',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 bg-gray-100 text-gray-900 hover:bg-gray-200'
  };
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-11 px-8'
  };
  
  return (
    <button
      className={`${baseClass} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm border-gray-200 bg-white ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const Input = ({ className = '', ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const Label = ({ children, htmlFor, className = '' }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
    {children}
  </label>
);

// Mock toast functionality
const useToast = () => ({
  toast: ({ title, description, variant }) => {
    console.log(`Toast: ${title} - ${description} (${variant})`);
    // In a real app, this would show a toast notification
  }
});

// Mock booking hook
const useCreateBooking = () => ({
  mutateAsync: async (bookingData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate successful booking creation
    return {
      data: {
        id: Math.floor(Math.random() * 10000) + 1000,
        ...bookingData
      }
    };
  },
  isPending: false
});

const BookingProcess = ({ bikeId, bikeTitle, hourlyRate, dailyRate, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [bookingId, setBookingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '18:00',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });
  
  const { toast } = useToast();
  const createBooking = useCreateBooking();

  const calculateDuration = () => {
    if (!bookingData.startDate || !bookingData.endDate || !bookingData.startTime || !bookingData.endTime) {
      return { days: 0, hours: 0, totalHours: 0 };
    }

    const startDateTime = new Date(`${bookingData.startDate}T${bookingData.startTime}`);
    const endDateTime = new Date(`${bookingData.endDate}T${bookingData.endTime}`);
    const diffTime = endDateTime.getTime() - startDateTime.getTime();
    const totalHours = diffTime / (1000 * 60 * 60);
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    return {
      days: Math.max(0, days),
      hours: Math.max(0, hours),
      totalHours: Math.max(1, totalHours), // Minimum 1 hour
    };
  };

  const calculatePrice = () => {
    const duration = calculateDuration();

    // If booking is 24+ hours, use daily rate, otherwise use hourly rate
    if (duration.totalHours >= 24) {
      const totalDays = Math.ceil(duration.totalHours / 24);
      return totalDays * dailyRate;
    } else {
      const hourlyPrice = hourlyRate || dailyRate / 24; // Fallback to daily rate / 24 if no hourly rate
      return Math.ceil(duration.totalHours) * hourlyPrice;
    }
  };

  const totalAmount = calculatePrice();
  const serviceFee = 15;
  const finalTotal = totalAmount + serviceFee;

  const handleInputChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const validateDateTimeSelection = () => {
    if (!bookingData.startDate || !bookingData.endDate || !bookingData.startTime || !bookingData.endTime) {
      return false;
    }

    const startDateTime = new Date(`${bookingData.startDate}T${bookingData.startTime}`);
    const endDateTime = new Date(`${bookingData.endDate}T${bookingData.endTime}`);

    // Check if start time is in the future
    if (startDateTime <= new Date()) {
      toast({
        title: 'Invalid Start Time',
        description: 'Start time must be in the future.',
        variant: 'destructive',
      });
      return false;
    }

    // Check if end time is after start time
    if (endDateTime <= startDateTime) {
      toast({
        title: 'Invalid End Time',
        description: 'End time must be after start time.',
        variant: 'destructive',
      });
      return false;
    }

    // Check minimum duration (1 hour)
    const duration = calculateDuration();
    if (duration.totalHours < 1) {
      toast({
        title: 'Minimum Duration',
        description: 'Minimum booking duration is 1 hour.',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && !validateDateTimeSelection()) {
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleSubmitBooking = async () => {
    try {
      setIsSubmitting(true);
      
      // Create ISO datetime strings for start and end times
      const startDateTime = new Date(`${bookingData.startDate}T${bookingData.startTime}`);
      const endDateTime = new Date(`${bookingData.endDate}T${bookingData.endTime}`);

      const bookingPayload = {
        bike_id: bikeId,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
      };

      const response = await createBooking.mutateAsync(bookingPayload);

      if (response.data) {
        setBookingId(response.data.id);
      }

      setStep(4);

      // Call success callback if provided
      if (onSuccess && response.data) {
        onSuccess(response.data.id);
      }
    } catch (error) {
      console.error('Booking submission failed:', error);
      toast({
        title: 'Booking Failed',
        description: 'There was an error processing your booking. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Dates & Time', icon: Calendar },
    { number: 2, title: 'Payment', icon: CreditCard },
    { number: 3, title: 'Review', icon: Clock },
    { number: 4, title: 'Confirmed', icon: CheckCircle },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Book {bikeTitle}</CardTitle>
            <Button variant="ghost" onClick={onClose}>
              ×
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-4">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step >= stepItem.number
                      ? 'bg-rose-500 border-rose-500 text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  <stepItem.icon className="h-5 w-5" />
                </div>
                <span
                  className={`ml-2 text-sm ${
                    step >= stepItem.number ? 'text-rose-500 font-medium' : 'text-gray-400'
                  }`}
                >
                  {stepItem.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-4 ${
                      step > stepItem.number ? 'bg-rose-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Dates & Time */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Dates & Time</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={bookingData.startDate}
                    min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={bookingData.endDate}
                    min={
                      bookingData.startDate ||
                      new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                    }
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={bookingData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={bookingData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                  />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span>
                    Duration:{' '}
                    {calculateDuration().totalHours < 24
                      ? `${Math.ceil(calculateDuration().totalHours)} hour(s)`
                      : `${Math.ceil(calculateDuration().totalHours / 24)} day(s)`}
                  </span>
                  <span className="font-semibold">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
              <Button
                onClick={handleNextStep}
                className="w-full bg-rose-500 hover:bg-rose-600"
                disabled={!bookingData.startDate || !bookingData.endDate}
              >
                Continue to Payment
              </Button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payment Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nameOnCard">Name on Card</Label>
                  <Input
                    id="nameOnCard"
                    placeholder="John Doe"
                    value={bookingData.nameOnCard}
                    onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={bookingData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={bookingData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={bookingData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="flex-1 bg-rose-500 hover:bg-rose-600"
                  disabled={!bookingData.nameOnCard || !bookingData.cardNumber}
                >
                  Review Booking
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Review Your Booking</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span>E-bike:</span>
                  <span className="font-medium">{bikeTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Start:</span>
                  <span>{bookingData.startDate} at {bookingData.startTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>End:</span>
                  <span>{bookingData.endDate} at {bookingData.endTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>
                    {calculateDuration().totalHours < 24
                      ? `${Math.ceil(calculateDuration().totalHours)} hour(s)`
                      : `${Math.ceil(calculateDuration().totalHours / 24)} day(s)`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee:</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmitBooking}
                  className="flex-1 bg-rose-500 hover:bg-rose-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h3 className="text-xl font-semibold text-green-600">Booking Confirmed!</h3>
              <p className="text-gray-600">
                Your e-bike has been successfully booked. You'll receive a confirmation email shortly.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700">Booking ID: #{bookingId || 'PENDING'}</p>
                <p className="text-sm text-green-700 mt-1">
                  {bikeTitle} • {bookingData.startDate} to {bookingData.endDate}
                </p>
                <p className="text-sm font-semibold text-green-800 mt-2">
                  Total Paid: ${finalTotal.toFixed(2)}
                </p>
              </div>
              <Button onClick={onClose} className="w-full bg-rose-500 hover:bg-rose-600">
                Close
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingProcess;
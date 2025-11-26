import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { STRIPE_PRODUCTS } from "@/config/stripeProducts";

export default function CheckoutTest() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runTests = async () => {
    setTesting(true);
    const testResults: any = {
      timestamp: new Date().toISOString(),
      environment: {},
      stripeConfig: {},
      products: [],
      checkout: {},
      automation: {}
    };

    // Test 1: Environment Variables
    try {
      testResults.environment = {
        supabaseUrl: !!import.meta.env.VITE_SUPABASE_URL,
        supabaseKey: !!import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        status: 'pass'
      };
    } catch (e) {
      testResults.environment.status = 'fail';
      testResults.environment.error = e.message;
    }

    // Test 2: Stripe Products Configuration
    try {
      testResults.stripeConfig = {
        productsConfigured: STRIPE_PRODUCTS.length,
        products: STRIPE_PRODUCTS.map(p => ({
          name: p.name,
          price: p.displayPrice,
          productId: p.stripeProductId,
          priceId: p.stripePriceId,
          slaHours: p.slaHours
        })),
        status: 'pass'
      };
    } catch (e) {
      testResults.stripeConfig.status = 'fail';
      testResults.stripeConfig.error = e.message;
    }

    // Test 3: Database Connection
    try {
      const { data, error } = await supabase.from('payments').select('count').limit(1);
      testResults.database = {
        connected: !error,
        status: error ? 'fail' : 'pass',
        error: error?.message
      };
    } catch (e) {
      testResults.database = {
        status: 'fail',
        error: e.message
      };
    }

    // Test 4: Edge Functions
    try {
      const { data, error } = await supabase.functions.invoke('create-subscription-checkout', {
        body: { 
          priceId: 'price_1SVlu5DdYjAsmtGqhsQM4snp',
          productTitle: 'Test Product',
          successPath: '/portal/dashboard',
          cancelPath: '/pricing?status=cancelled'
        }
      });
      testResults.edgeFunctions = {
        checkoutFunction: error ? 'fail' : 'pass',
        error: error?.message,
        response: data
      };
    } catch (e) {
      testResults.edgeFunctions = {
        status: 'fail',
        error: e.message
      };
    }

    // Test 5: Webhook Configuration
    try {
      const { data: webhookTest } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);
      
      testResults.webhook = {
        recentPayments: webhookTest?.length || 0,
        latestPayment: webhookTest?.[0] || null,
        status: 'info'
      };
    } catch (e) {
      testResults.webhook = {
        status: 'fail',
        error: e.message
      };
    }

    // Test 6: Case Automation
    try {
      const { data: casesTest } = await supabase
        .from('cases')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);
      
      testResults.automation = {
        recentCases: casesTest?.length || 0,
        latestCase: casesTest?.[0] || null,
        status: 'info'
      };
    } catch (e) {
      testResults.automation = {
        status: 'fail',
        error: e.message
      };
    }

    setResults(testResults);
    setTesting(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'info':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Loader2 className="h-5 w-5 animate-spin" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Card className="glass-card border-accent/20 mb-6">
            <CardHeader>
              <CardTitle className="text-3xl font-display">Checkout Flow Debug Tool</CardTitle>
              <p className="text-muted-foreground">
                This page tests the complete payment and automation workflow.
              </p>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={runTests} 
                disabled={testing}
                className="shadow-gold"
                size="lg"
              >
                {testing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Running Tests...
                  </>
                ) : (
                  'Run Complete System Test'
                )}
              </Button>
            </CardContent>
          </Card>

          {results && (
            <div className="space-y-6">
              {/* Environment Variables */}
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(results.environment?.status)}
                    <CardTitle>Environment Configuration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
                    {JSON.stringify(results.environment, null, 2)}
                  </pre>
                </CardContent>
              </Card>

              {/* Stripe Configuration */}
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(results.stripeConfig?.status)}
                    <CardTitle>Stripe Products Configuration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
                    {JSON.stringify(results.stripeConfig, null, 2)}
                  </pre>
                </CardContent>
              </Card>

              {/* Database */}
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(results.database?.status)}
                    <CardTitle>Database Connection</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
                    {JSON.stringify(results.database, null, 2)}
                  </pre>
                </CardContent>
              </Card>

              {/* Edge Functions */}
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(results.edgeFunctions?.checkoutFunction === 'pass' ? 'pass' : 'fail')}
                    <CardTitle>Edge Functions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
                    {JSON.stringify(results.edgeFunctions, null, 2)}
                  </pre>
                </CardContent>
              </Card>

              {/* Webhook */}
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(results.webhook?.status)}
                    <CardTitle>Webhook & Payment Processing</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
                    {JSON.stringify(results.webhook, null, 2)}
                  </pre>
                </CardContent>
              </Card>

              {/* Automation */}
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(results.automation?.status)}
                    <CardTitle>Case Automation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
                    {JSON.stringify(results.automation, null, 2)}
                  </pre>
                </CardContent>
              </Card>

              {/* Full Results */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Complete Test Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
                    {JSON.stringify(results, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

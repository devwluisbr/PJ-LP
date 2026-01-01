-- Criar tabela para armazenar leads do formulário de contato
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  interesse TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS para proteção dos dados
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção pública (qualquer visitante pode enviar lead)
CREATE POLICY "Anyone can insert leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Política para leitura apenas por usuários autenticados (admin)
CREATE POLICY "Only authenticated users can view leads" 
ON public.leads 
FOR SELECT 
TO authenticated
USING (true);
// Copyright (c) Meta Platforms, Inc. and affiliates.

import * as stylex from '@stylexjs/stylex';
import {colorVars, spacingVars} from '@astryxdesign/core/theme/tokens.stylex';
import {VStack, HStack} from '@astryxdesign/core/Layout';
import {Card} from '@astryxdesign/core/Card';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';

type Variant = 'yellow' | 'blue' | 'orange' | 'green';

const SERVICES: {
  title: string;
  description: string;
  stack: string;
  variant: Variant;
}[] = [
  {
    title: 'Site vitrine',
    description:
      'Un site clair et rapide pour présenter votre activité, adapté au mobile et aux moteurs de recherche.',
    stack: 'Angular · React · PHP',
    variant: 'yellow',
  },
  {
    title: 'Application sur mesure',
    description:
      'Un outil métier ou une plateforme : comptes, rôles, base de données et interface soignée.',
    stack: 'ASP.NET · React · MySQL',
    variant: 'blue',
  },
  {
    title: 'Hébergement',
    description: 'Serveur privé, nom de domaine, HTTPS et sauvegardes.',
    stack: 'VPS · Linux · Proxmox',
    variant: 'orange',
  },
  {
    title: 'Maintenance',
    description:
      "Corrections, mises à jour et nouvelles fonctionnalités d'un site existant.",
    stack: 'PHP · Angular · MySQL',
    variant: 'green',
  },
];

const STACK = [
  'Angular',
  'React',
  'ASP.NET',
  'PHP',
  'MySQL',
  'VPS',
  'Proxmox',
] as const;

const STEPS: {title: string; text: string; variant: Variant}[] = [
  {title: 'Échange', text: 'Besoin, public, budget.', variant: 'yellow'},
  {title: 'Maquette', text: 'Structure et design validés.', variant: 'blue'},
  {title: 'Développement', text: 'Points réguliers.', variant: 'orange'},
  {title: 'Mise en ligne', text: 'Tests et prise en main.', variant: 'green'},
];

// A numeric Grid never reflows. These grids use media rules so the staircase
// and the step strip collapse to one column on a phone.
const styles = stylex.create({
  page: {
    minHeight: '100vh',
    backgroundColor: colorVars['--color-background-body'],
    color: colorVars['--color-text-primary'],
    padding: 'clamp(24px, 5vw, 72px)',
  },
  inner: {
    maxWidth: 1120,
    marginInline: 'auto',
  },
  stairs: {
    display: 'grid',
    rowGap: spacingVars['--spacing-4'],
    columnGap: spacingVars['--spacing-4'],
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 900px)': 'repeat(12, minmax(0, 1fr))',
    },
  },
  stair: (column: number) => ({
    gridColumn: {
      default: 'auto',
      '@media (min-width: 900px)': `${column} / span 6`,
    },
  }),
  steps: {
    display: 'grid',
    gap: spacingVars['--spacing-3'],
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 640px)': 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 960px)': 'repeat(4, minmax(0, 1fr))',
    },
  },
});

export default function Services() {
  return (
    <div {...stylex.props(styles.page)}>
      <main {...stylex.props(styles.inner)}>
        <VStack gap={10}>
          <VStack gap={5}>
            <Heading level={1} type="display-1">
              Votre site, de A à Z.
            </Heading>
            <Text type="large">
              Je conçois, développe et héberge des sites web clairs, rapides et
              faciles à gérer.
            </Text>
            <HStack gap={3} wrap="wrap">
              <Button
                label="Demander un devis"
                variant="primary"
                size="lg"
                href="#contact"
              />
              <Button
                label="Voir les services"
                variant="secondary"
                size="lg"
                href="#services"
              />
            </HStack>
            <HStack gap={2} wrap="wrap">
              {STACK.map((tech, i) => (
                <Badge
                  key={tech}
                  label={tech}
                  variant={
                    (['yellow', 'blue', 'orange', 'green'] as const)[i % 4]
                  }
                />
              ))}
            </HStack>
          </VStack>

          <VStack gap={4} id="services">
            <Heading level={2}>Mes services</Heading>
            <div {...stylex.props(styles.stairs)}>
              {SERVICES.map((service, i) => (
                <div
                  key={service.title}
                  {...stylex.props(styles.stair(i * 2 + 1))}>
                  <Card variant={service.variant} padding={6} height="100%">
                    <VStack gap={3}>
                      <Heading level={3} type="display-3">
                        {service.title}
                      </Heading>
                      <Text>{service.description}</Text>
                      <Text weight="bold" size="sm">
                        {service.stack}
                      </Text>
                    </VStack>
                  </Card>
                </div>
              ))}
            </div>
          </VStack>

          <VStack gap={4}>
            <Heading level={2}>Comment ça se passe</Heading>
            <div {...stylex.props(styles.steps)}>
              {STEPS.map(step => (
                <Card key={step.title} variant={step.variant} padding={4}>
                  <VStack gap={1}>
                    <Heading level={3}>{step.title}</Heading>
                    <Text size="sm">{step.text}</Text>
                  </VStack>
                </Card>
              ))}
            </div>
          </VStack>

          <Card variant="pink" padding={8}>
            <VStack gap={4} id="contact">
              <Heading level={2} type="display-3">
                Un projet en tête ?
              </Heading>
              <Text type="large">
                Décrivez votre besoin en quelques lignes, je vous réponds avec
                une proposition.
              </Text>
              <HStack>
                <Button
                  label="Me contacter"
                  variant="primary"
                  size="lg"
                  href="mailto:contact@example.com"
                />
              </HStack>
            </VStack>
          </Card>
        </VStack>
      </main>
    </div>
  );
}

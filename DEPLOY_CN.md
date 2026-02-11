# China Deployment (Self-hosted with Docker)

This project is configured with `Next.js standalone` output and can be deployed directly to cloud servers in Mainland China.

## 1) Server prerequisites

- Ubuntu 22.04+ (recommended)
- Docker + Docker Compose plugin installed
- Open port `3000` (or only `80/443` when using Nginx/Caddy reverse proxy)

## 2) Prepare environment variables

Copy the template in project root:

```bash
cp .env.production.example .env.production
```

Set at least:

- `DATABASE_URL`
- `JWT_SECRET`

## 3) Build and run

```bash
docker compose up -d --build
```

Check logs:

```bash
docker compose logs -f blog-next
```

## 4) Health check

```bash
curl http://127.0.0.1:3000
```

If HTML is returned, service is running.

## 5) Production recommendations (China)

- Deploy app and database in the same region.
- Use Nginx/Caddy for TLS termination and reverse proxy.
- If serving public traffic from a Mainland China domain, ICP filing is usually required.

## 6) Update release

After pulling latest code:

```bash
docker compose up -d --build
```

## 7) Quick rollback

```bash
docker images
# choose previous image id
docker stop blog-next && docker rm blog-next
docker run -d --name blog-next --env-file .env.production -p 3000:3000 <IMAGE_ID>
```


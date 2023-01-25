resource "aws_ecr_repository" "socks" {
  name                 = "socks"
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_lifecycle_policy" "socks" {
  repository = aws_ecr_repository.socks.name

  policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Keep last 30 images",
            "selection": {
                "tagStatus": "untagged",
                "countType": "imageCountMoreThan",
                "countNumber": 30
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}
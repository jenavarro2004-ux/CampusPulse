<?php

namespace App\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case OSSA = 'ossa';
    case COUNCIL = 'council';
    case OFFICER = 'officer';
    case STUDENT = 'student';
}

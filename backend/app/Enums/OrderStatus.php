<?php

namespace App\Enums;

enum OrderStatus: string
{
    case OrderPlaced = "Order placed";
    case OrderConfirmed = "Order confirmed";
    case PrintingStarted = "Processing";
    case ReadForPickup = "Ready-for-pickup";
    case Completed = "Completed";
    case Cancelled = "Cancelled";
}

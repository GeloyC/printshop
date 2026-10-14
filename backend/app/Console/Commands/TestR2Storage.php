<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Support\Facades\Storage;
use Illuminate\Console\Command;

#[Signature('app:test-r2-storage')]
#[Description('Command description')]
class TestR2Storage extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $disk = Storage::disk('r2');
        $path = 'tests/connection-test.txt';

        // 1. Upload a test file
        $disk->put($path, 'Hello from Laravel!');

        $this->info('File uploaded successfully.');

        // 2. Read the test file
        $contents = $disk->get($path);

        $this->info('File contents: ' . $contents);

        // 3. Delete the test file
        $disk->delete($path);

        $this->info('Test file deleted.');

        return self::SUCCESS;
    }
}
